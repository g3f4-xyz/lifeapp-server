import * as Agenda from 'agenda';
import * as moment from 'moment-timezone';
import { sendNotification } from 'web-push';
import { DB_HOST } from './config';
import { DATE_TIME_FORMAT, FIELD_ID, TASK_TYPE, TASK_TYPE_VALUE_MAP } from './constants';
import { getSettings, getTasksWithActiveNotification, setTaskNonActive } from './db/api';
import { emitter } from './db/emitter';
import { ITask } from './db/interfaces';

moment.tz.setDefault('Europe/Warsaw');
// const ROUTINE_CHECK_INTERVAL_MS = 6000;

const agenda = new Agenda({ db: { address: DB_HOST } });

const JOBS_NAMES: TASK_TYPE_VALUE_MAP<string> = {
  [TASK_TYPE.ROUTINE]: 'sendRoutineNotifications',
  [TASK_TYPE.TODO]: 'sendTodosNotifications',
  [TASK_TYPE.EVENT]: 'sendEventsNotifications',
  [TASK_TYPE.MEETING]: 'sendMeetingsNotifications',
};

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

const groupBy: <T = any>(arr: T[], property: string) => { [key: string]: T[] } = (arr, property) => {
  return arr.reduce((acc, item) => {
    if (!acc[item[property]]) {
      acc[item[property]] = [];
    }

    acc[item[property]].push(item);

    return acc;
  }, {});
};

agenda.on('ready', async (): Promise<void> => {
  try {
    await agenda.start();
    await agenda.cancel({ name: JOBS_NAMES.ROUTINE });
    await agenda.cancel({ name: JOBS_NAMES.TODO });
    await agenda.cancel({ name: JOBS_NAMES.EVENT });
    await agenda.cancel({ name: JOBS_NAMES.MEETING });

    await agenda.define(JOBS_NAMES.ROUTINE, async () => {
      console.log(['agenda:sendRoutineNotifications']);
      const routines = await getTasksWithActiveNotification(TASK_TYPE.ROUTINE);
      console.log(['agenda:sendRoutineNotifications.routines'], routines);
      const usersRoutines = groupBy<ITask>(routines, 'ownerId');
      console.log(['agenda:sendRoutineNotifications.usersRoutines'], usersRoutines);


      Object.keys(usersRoutines).map(userId => usersRoutines[userId]).forEach((list => {
        list.forEach((async routine => {
          const title = routine.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
          const action = routine.fields.find(({ fieldId }) => fieldId === 'ACTION').value.text;
          const cycleValue = routine.fields.find(({ fieldId }) => fieldId === 'CYCLE').value;
          const notification = {
            body: action,
          };
          console.log(['agenda:sendRoutineNotifications:list.forEach.cycleValue'], cycleValue);

          await sendUserNotification(routine.ownerId, routine.taskType, title, notification);
        }));
      }));
    });

    await agenda.define(JOBS_NAMES.TODO, async () => {
      console.log(['agenda:sendTodosNotifications']);
      const todos = await getTasksWithActiveNotification(TASK_TYPE.TODO);
      console.log(['agenda:sendTodosNotifications.todos'], todos);
      const usersTodos = groupBy<ITask>(todos, 'ownerId');
      console.log(['agenda:sendTodosNotifications.usersTodos'], usersTodos);

      const usersTodosData = Object.keys(usersTodos).map(userId => usersTodos[userId]).map((list => list.map((todo => {
        const title = todo.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
        const note = todo.fields.find(({ fieldId }) => fieldId === 'NOTE').value.text;
        const status = todo.fields.find(({ fieldId }) => fieldId === 'STATUS').value.id;
        console.log(['agenda:sendTodosNotifications:list.forEach'], todo);

        return { title, note, ownerId: todo.ownerId, status };
      }))));

      usersTodosData.forEach(async todosData => {
        const [{ ownerId }] = todosData;
        const title = 'Daily todos status';
        const body = todosData.reduce((acc, data) => `${acc}\n${data.title} | status: ${data.status} | note: ${data.note}`, '');
        const notification = {
          body,
        };

        await sendUserNotification(ownerId, TASK_TYPE.TODO, title, notification);
      });
    });

    await agenda.define(JOBS_NAMES.EVENT, async () => {
      console.log(['agenda:sendEventsNotifications']);
      const events = await getTasksWithActiveNotification(TASK_TYPE.EVENT);
      console.log(['agenda:sendEventsNotifications.routines'], events);
      const usersEvents = groupBy<ITask>(events, 'ownerId');
      console.log(['agenda:sendEventsNotifications.usersEvents'], usersEvents);

      Object.keys(usersEvents).map(userId => usersEvents[userId]).forEach((list => {
        list.forEach((async event => {
          const title = event.fields.find(({ fieldId }) => fieldId === 'TITLE').value.text;
          const desc = event.fields.find(({ fieldId }) => fieldId === 'DESCRIPTION').value.text;
          const notification = {
            body: desc,
          };
          console.log(['agenda:sendEventsNotifications:list.forEach'], event);

          await sendUserNotification(event.ownerId, event.taskType, title, notification);
        }));
      }));
    });


    await agenda.define(JOBS_NAMES.MEETING, async () => {
      console.log(['agenda:sendMeetingsNotifications']);
      const meetings = await getTasksWithActiveNotification(TASK_TYPE.MEETING);
      const usersMeetings = groupBy<ITask>(meetings, 'ownerId');
      const nowMoment = moment(Date.now());
      const nextMinuteMoment = moment(Date.now()).add(1, 'minute');

      Object.keys(usersMeetings).map(userId => usersMeetings[userId]).forEach((list => {
        list.forEach((async meeting => {
          const title = meeting.fields.find(({ fieldId }) => fieldId === FIELD_ID.TITLE).value.text;
          const note = meeting.fields.find(({ fieldId }) => fieldId === FIELD_ID.NOTE).value.text;
          const person = meeting.fields.find(({ fieldId }) => fieldId === FIELD_ID.PERSON).value.text;
          const location = meeting.fields.find(({ fieldId }) => fieldId === FIELD_ID.LOCATION).value.text;
          const dateTime = meeting.fields.find(({ fieldId }) => fieldId === FIELD_ID.DATE_TIME).value.text;
          const dateTimeMoment = moment(dateTime);
          const isBetween = dateTimeMoment.isBetween(nowMoment, nextMinuteMoment);
          console.log(['agenda:sendMeetingsNotifications.1'], nowMoment.toISOString());
          console.log(['agenda:sendMeetingsNotifications.2'], dateTimeMoment.toISOString());
          console.log(['agenda:sendMeetingsNotifications.3'], nextMinuteMoment.toISOString());
          console.log(['agenda:sendMeetingsNotifications.isBetween'], isBetween);
          const notification = {
            body: `
              isBetween: ${isBetween}\n
              nowMoment: ${nowMoment.format(DATE_TIME_FORMAT)}\n
              dateTimeMoment: ${dateTimeMoment.format(DATE_TIME_FORMAT)}\n
              person: ${person}\n
              note: ${note}\n
              location: ${location}\n
              dateTime: ${dateTime}\n
            `,
          };

          if (isBetween) {
            await sendUserNotification(meeting.ownerId, meeting.taskType, title, notification);
            await setTaskNonActive(meeting._id);
          }

        }));
      }));
    });

    // await agenda.every(ROUTINE_CHECK_INTERVAL_MS, JOBS_NAMES.ROUTINE);
    await agenda.every('0 10 * * *', JOBS_NAMES.TODO, {}, {
      timezone: 'Europe/Warsaw',
    });
    // await agenda.every(ROUTINE_CHECK_INTERVAL_MS, JOBS_NAMES.EVENT);
    await agenda.every('10 second', JOBS_NAMES.MEETING, {}, {
      timezone: 'Europe/Warsaw',
    });
    console.log(['agenda:started']);
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
