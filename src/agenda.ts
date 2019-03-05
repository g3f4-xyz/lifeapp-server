import * as Agenda from 'agenda';
// import moment from 'moment';
import { sendNotification } from 'web-push';

import { DB_HOST } from './config';
import { TASK_TYPE } from './constants';
import { getActiveRoutines, getSettings } from './db/api';
import { emitter } from './db/emitter';
import { ITask } from './db/interfaces';

const ROUTINE_CHECK_INTERVAL_MS = 60000;

const agenda = new Agenda({ db: { address: DB_HOST } });

const sendUserNotification = async (ownerId: string, taskType: string, title: string, notification: any): Promise<void> => {
  console.log(['sendUserNotification'], ownerId, taskType, title, notification);
  const {
    notifications: {
      general: {
        show,
        // vibrate,
      },
      types: {
        events,
        meetings,
        todos,
        routines,
      },
      subscriptions,
    },
  } = await getSettings(ownerId);
  console.log(['sendUserNotification.settings'], {
    general: {
      show,
      // vibrate,
    },
    types: {
      events,
      meetings,
      todos,
      routines,
    },
    subscriptions,
  });
  console.log(['sendUserNotification.taskType'], taskType);

  if (show) {
    if (
      taskType === TASK_TYPE.TODO && todos ||
      taskType === TASK_TYPE.EVENT && events ||
      taskType === TASK_TYPE.MEETING && meetings ||
      taskType === TASK_TYPE.ROUTINE && routines
    ) {
      const payload = JSON.stringify({
        title,
        notification: {
          icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
          ...notification,
        },
      });

      await Promise.all(subscriptions.map(async ({ subscriptionData }) => {
        await sendNotification(subscriptionData, payload);
      }));
    }
  }
};

function groupBy(arr: any, property: string) {
  return arr.reduce((memo: any, x: any) => {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  }, {});
}

agenda.on('ready', async (): Promise<void> => {
  try {
    await agenda.start();
    console.log(['agenda:start']);
    await agenda.define('sendRoutineNotifications', async () => {
      console.log(['agenda:sendRoutineNotifications']);
      const routines = await getActiveRoutines();
      const usersRoutines: { [key: string]: ITask[] } = groupBy(routines, 'ownerId');

      Object.keys(usersRoutines).map(userId => usersRoutines[userId]).forEach((list => {
        list.forEach((async routine => {
          const title = routine.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
          const note = routine.fields.find(({ fieldId }) => fieldId === 'NOTE').value.text;
          const notification = {
            body: note,
          };

          await sendUserNotification(routine.ownerId, routine.taskType, title, notification);
        }));
      }));
    });

    await agenda.every(ROUTINE_CHECK_INTERVAL_MS, 'sendRoutineNotifications');
  }
  catch (e) {
    console.error('error starting agenda');
  }
});

const graceful = async () => {
  await agenda.stop();

  process.exit(0);
};

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

emitter.on('task:added', async (task: ITask) => {
  console.log(['emitter.on:task:added'], task);

  // if (task.taskType === TASK_TYPE.MEETING) {
  //   const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
  //   const person = task.fields.find(({ fieldId }) => fieldId === 'PERSON').value.text;
  //   const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
  //   const when = new Date(moment(date).subtract(1, 'hour').toString());
  //
  //   await agenda.schedule(when, 'notification:task', {
  //     ownerId: task.ownerId,
  //     title: `You have meeting with ${person}`,
  //     notification: {
  //       body: `Time: ${date} | Location: ${location}`,
  //     },
  //     taskType: task.taskType,
  //   });
  // }
  //
  // if (task.taskType === TASK_TYPE.EVENT) {
  //   const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
  //   const title = task.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
  //   const duration = task.fields.find(({ fieldId }) => fieldId === 'DURATION').value.text;
  //   const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
  //   const when = new Date(moment(date).startOf('day').add(8, 'hour').toString());
  //
  //   await agenda.schedule(when, 'notification', {
  //     ownerId: task.ownerId,
  //     title: `Upcoming event today: ${title}`,
  //     notification: {
  //       body: `Time: ${date} | Location: ${location} | Duration: ${duration}`,
  //     },
  //     taskType: task.taskType,
  //   });
  // }
});

emitter.on('task:updated', async (task: ITask) => {
  console.log(['emitter.on:task:updated'], task);
});
