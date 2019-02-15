import * as Agenda from 'agenda';
import moment from 'moment';
import { sendNotification } from 'web-push';

import { DB_HOST } from './config';
import { TASK_TYPE } from './constants';
import { getSettings } from './db/api';
import { emitter } from './db/emitter';
import { ITask } from './db/interfaces';

const agenda = new Agenda({ db: { address: DB_HOST } });

agenda.define('notification', async (job, done): Promise<void> => {
  const { ownerId, taskType, notification: { body, title } } = job.attrs.data;

  const {
    notifications: {
      general: {
        show,
        // vibrate,
      },
      types: {
        events,
        meetings,
        // todos,
        routines,
      },
      subscriptions,
    },
  } = await getSettings(ownerId);

  if (show) {
    if (
      taskType === TASK_TYPE.EVENT && events ||
      taskType === TASK_TYPE.MEETING && meetings ||
      taskType === TASK_TYPE.ROUTINE && routines
    ) {
      const payload = JSON.stringify({
        title,
        notification: {
          body,
          icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
        },
      });

      await Promise.all(subscriptions.map(async ({ subscriptionData }) => {
        await sendNotification(subscriptionData, payload);
      }));
    }
  }

  done();
});

agenda.on('ready', async (): Promise<void> => {
  await agenda.start();
});

const graceful = async () => {
  await agenda.stop();

  process.exit(0);
};

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

emitter.on('task:added', async (task: ITask) => {
  if (task.taskType === TASK_TYPE.MEETING) {
    const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
    const person = task.fields.find(({ fieldId }) => fieldId === 'PERSON').value.text;
    const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
    const when = new Date(moment(date).subtract(1, 'hour').toString());

    await agenda.schedule(when, 'notification', {
      ownerId: task.ownerId,
      notification: {
        body: `Time: ${date} | Location: ${location}`,
        title: `You have meeting with ${person}`,
      },
      taskType: task.taskType,
    });
  }

  if (task.taskType === TASK_TYPE.EVENT) {
    const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
    const title = task.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
    const duration = task.fields.find(({ fieldId }) => fieldId === 'DURATION').value.text;
    const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
    const when = new Date(moment(date).startOf('day').add(8, 'hour').toString());

    await agenda.schedule(when, 'notification', {
      ownerId: task.ownerId,
      notification: {
        body: `Time: ${date} | Location: ${location} | Duration: ${duration}`,
        title: `Upcoming event today: ${title}`,
      },
      taskType: task.taskType,
    });
  }
});
