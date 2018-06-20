const Agenda = require('agenda');
const moment = require('moment');
const webPush = require('web-push');
const { DB_HOST } = require('./config');
const emitter = require('./api/emitter');

let agenda = new Agenda({ db: { address: DB_HOST } });

agenda.define('notification', async (job, done) => {
  console.log(['agenda:job:notification'], job.attrs);
  const { getSubscriptions } = require('./api');
  const { ownerId, notification: { body, title } } = job.attrs.data;
  const payload = JSON.stringify({
    title,
    notification: {
      body,
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  const subscriptions = await getSubscriptions(ownerId);

  subscriptions.map(({ subscription }) => {
    webPush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });

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

emitter.on('task:added', (task) => {
  console.log(['api:emitter:on:task:added'], task);
  if (task.taskType === 'MEETING') {
    const date = task.fields.find(({ fieldId }) => fieldId === 'DATE_TIME').value.text;
    const person = task.fields.find(({ fieldId }) => fieldId === 'PERSON').value.text;
    const location = task.fields.find(({ fieldId }) => fieldId === 'LOCATION').value.text;
    const when = new Date(moment(date).subtract(1, 'hour').toString());

    console.log(['api:addTask:MEETING'], { date, when });

    agenda.schedule(when, 'notification', {
      ownerId: task.ownerId,
      notification: {
        body: `Time: ${date} | Location: ${location}`,
        title: `You have meeting with ${person}`,
      },
    });
  }
});
