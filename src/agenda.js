const Agenda = require('agenda');
const moment = require('moment');
const webPush = require('web-push');
const { DB_HOST } = require('./config');
const { TASK_TYPES } = require('./constants');
const emitter = require('./db/emitter');

let agenda = new Agenda({ db: { address: DB_HOST } });
const calculateInterval = (cycle, when, customValueOptionValue) => {
  if (cycle === 'TIME') {
    if (when === 'HALF_HOUR') {
      return `30 minutes`;
    }
    else if (when === 'HOUR') {
      return `1 hour`;
    }
    else if (when === 'HOURS_3') {
      return `3 hour`;
    }
    else if (when === 'HOURS_12') {
      return `12 hour`;
    }
    else if (when === 'CUSTOM') {
      return `${customValueOptionValue} minutes`;
    }
  }
  else if (cycle === 'DAY') {
    if (when === 'MORNING') {
      return `morning`;
    }
    else if (when === 'NOON') {
      return `noon`;
    }
    else if (when === 'EVENING') {
      return `evening`;
    }
    else if (when === 'CUSTOM') {
      return `at ${customValueOptionValue}`;
    }
  }
  else if (cycle === 'WEEK') {
    if (when === 'WORKDAY') {
      return `morning`;
    }
    else if (when === 'WEEKEND') {
      return `noon`;
    }
    else if (when === 'MONDAY') {
      return `evening`;
    }
    else if (when === 'TUESDAY') {
      return `evening`;
    }
    else if (when === 'SATURDAY') {
      return `evening`;
    }
    else if (when === 'CUSTOM') {
      return `at ${customValueOptionValue}`;
    }
  }
  else if (cycle === 'WEEK') {
    if (when === 'BEGIN') {
      return `morning`;
    }
    else if (when === 'MIDDLE') {
      return `noon`;
    }
    else if (when === 'END') {
      return `evening`;
    }
    else if (when === 'CUSTOM') {
      return `at ${customValueOptionValue}`;
    }
  }
};
agenda.define('notification', async (job, done) => {
  console.log(['agenda:job:notification'], job.attrs);
  const { getSubscriptions, getSettings } = require('./db/api');
  const { ownerId, taskType, notification: { body, title } } = job.attrs.data;
  const payload = JSON.stringify({
    title,
    notification: {
      body,
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  const subscriptions = await getSubscriptions(ownerId);
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
    },
  } = await getSettings(ownerId);

  if (show) {
    if (
      taskType === TASK_TYPES.EVENT && events ||
      taskType === TASK_TYPES.MEETING && meetings ||
      taskType === TASK_TYPES.ROUTINE && routines
    ) {
      subscriptions.map(({ subscription }) => {
        webPush
          .sendNotification(subscription, payload)
          .catch(err => console.error(err));
      });
    }
  }

  done();
});

agenda.on('ready', () => {
  console.log('agenda ready');
  agenda.start();
});

const graceful = () => {
  agenda.stop(() => {
    process.exit(0);
  });
};

process.on('SIGTERM', graceful);
process.on('SIGINT' , graceful);

emitter.on('task:added', async task => {
  console.log(['agenda:api:emitter:on:task:added'], task);

  if (task.taskType === TASK_TYPES.MEETING) {
    const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
    const person = task.fields.find(({ fieldId }) => fieldId === 'PERSON').value.text;
    const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
    const when = new Date(moment(date).subtract(1, 'hour').toString());

    agenda.schedule(when, 'notification', {
      ownerId: task.ownerId,
      notification: {
        body: `Time: ${date} | Location: ${location}`,
        title: `You have meeting with ${person}`,
      },
      taskType: task.taskType,
    });
  }

  if (task.taskType === TASK_TYPES.EVENT) {
    const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
    const title = task.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
    const duration = task.fields.find(({ fieldId }) => fieldId === 'DURATION').value.text;
    const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
    const when = new Date(moment(date).startOf('day').add(8, 'hour').toString());

    agenda.schedule(when, 'notification', {
      ownerId: task.ownerId,
      notification: {
        body: `Time: ${date} | Location: ${location} | Duration: ${duration}`,
        title: `Upcoming event today: ${title}`,
      },
      taskType: task.taskType,
    });
  }

  if (task.taskType === TASK_TYPES.ROUTINE) {
    const title = task.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
    const action = task.fields.find(({ fieldId }) => fieldId === 'ACTION').value.text;
    const cycle = task.fields.find(({ fieldId }) => fieldId === 'CYCLE').value.id;
    const { value: { ids: when, customValueOptionValue } } =
      task.fields.find(({ fieldId }) => fieldId === 'WHEN') || {};

    await when.forEach(async when => {
      const interval = calculateInterval(cycle, when, customValueOptionValue);
      const routine = agenda.create('notification', {
        ownerId: task.ownerId,
        notification: {
          body: `Action: ${action}`,
          title,
        },
        taskType: task.taskType,
      });

      await routine.repeatEvery(interval).save();
    });
  }
});
