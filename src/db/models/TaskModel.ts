import { Moment } from 'moment-timezone';
import * as moment from 'moment-timezone';
import { Document, Model, model, Schema } from 'mongoose';
import { CYCLE, DAY_CYCLE, FIELD_ID, MONTH_CYCLE, TASK_TYPE, TIME_CYCLE, WEEK_CYCLE } from '../../constants';

import { IFieldValue, ITask } from '../interfaces';
import { FieldSchema } from '../schemas/FieldSchema';

export interface ITaskDocument extends ITask, Document {}

export const TaskSchema: Schema<ITaskDocument> = new Schema({
  ownerId: String,
  taskType: String,
  updatedAt: Date,
  lastChangedFieldId: String,
  notificationAt: Date,
  lastNotificationAt: Date,
  fields: [FieldSchema],
});

export const TaskFieldsSchemaPath = TaskSchema.path('fields');

export const isNotificationAtUpdateNeeded = (taskType: TASK_TYPE, lastChangedFieldId: FIELD_ID) => {
  switch (taskType) {
    case TASK_TYPE.ROUTINE:
      return lastChangedFieldId === FIELD_ID.CYCLE;
    case TASK_TYPE.MEETING:
      return lastChangedFieldId === FIELD_ID.DATE_TIME;
    default:
      return false;
  }
};

export const calculateNextCycle = (fieldValue: IFieldValue): Moment | null => {
  if (fieldValue && fieldValue.ownValue) {
    if (fieldValue.ownValue.id === CYCLE.DAY && fieldValue.childrenValue && fieldValue.childrenValue.ownValue) {
      switch (fieldValue.childrenValue.ownValue.id as unknown as DAY_CYCLE) {
        case DAY_CYCLE.EVENING:
          const eveningMoment = moment(Date.now())
            .startOf('day')
            .add(20, 'hour');
          const pastEvening = moment(Date.now()).isAfter(eveningMoment);

          return pastEvening ? eveningMoment.add(1, 'day') : eveningMoment;
        case DAY_CYCLE.MORNING:
          const morningMoment = moment(Date.now())
            .startOf('day')
            .add(8, 'hour');
          const pastMorning = moment(Date.now()).isAfter(morningMoment);

          return pastMorning ? morningMoment.add(1, 'day') : morningMoment;
        case DAY_CYCLE.NOON:
          const noonMoment = moment(Date.now())
            .startOf('day')
            .add(12, 'hour');
          const pastNoon = moment(Date.now()).isAfter(noonMoment);

          return pastNoon ? noonMoment.add(1, 'day') : noonMoment;
        default:
          return null;
      }
    }

    if (fieldValue.ownValue.id === CYCLE.MONTH && fieldValue.childrenValue && fieldValue.childrenValue.ownValue) {
      switch (fieldValue.childrenValue.ownValue.id as unknown as MONTH_CYCLE) {
        case MONTH_CYCLE.END:
          return moment(Date.now())
            .endOf('month')
            .add(1, 'month');
        case MONTH_CYCLE.MIDDLE:
          return moment(Date.now())
            .endOf('month')
            .add(16, 'day');
        case MONTH_CYCLE.START:
          return moment(Date.now())
            .endOf('month')
            .add(1, 'day');
        default:
          return null;
      }
    }

    if (fieldValue.ownValue.id === CYCLE.WEEK && fieldValue.childrenValue && fieldValue.childrenValue.ownValue) {
      switch (fieldValue.childrenValue.ownValue.id as unknown as WEEK_CYCLE) {
        case WEEK_CYCLE.FIRST_DAY:
          return moment(Date.now())
            .endOf('week')
            .add(1, 'day');
        case WEEK_CYCLE.LAST_DAY:
          return moment(Date.now())
            .endOf('week')
            .add(1, 'week');
        // case WEEK_CYCLE.WEEK_DAYS:
        //   return moment(Date.now())
        //     .endOf('month')
        //     .add(1, 'day');
        // case WEEK_CYCLE.WEEKEND:
        //   return moment(Date.now())
        //     .endOf('month')
        //     .add(1, 'day');
        default:
          return null;
      }
    }

    if (fieldValue.ownValue.id === CYCLE.TIME && fieldValue.childrenValue && fieldValue.childrenValue.ownValue) {
      switch (fieldValue.childrenValue.ownValue.id as unknown as TIME_CYCLE) {
        case TIME_CYCLE.HOUR:
          return moment(Date.now())
            .add(1, 'hour');
        case TIME_CYCLE.HOURS_3:
          return moment(Date.now())
            .add(3, 'hour');
        case TIME_CYCLE.HOURS_12:
          return moment(Date.now())
            .add(12, 'hour');
        case TIME_CYCLE.MINUTES:
          return fieldValue.childrenValue.childrenValue && fieldValue.childrenValue.childrenValue.ownValue
            ? moment(Date.now())
              .add(parseInt(fieldValue.childrenValue.childrenValue.ownValue.text, 10), 'minute')
            : null;
        default:
          return null;
      }
    }
  }

  return null;
};

export const calculateNotificationAt = (
  taskType: TASK_TYPE,
  lastNotificationAt: Date,
  fieldValue: IFieldValue,
): Date | null => {
  console.log(['calculateNotificationAt'], taskType, lastNotificationAt, fieldValue);
  switch (taskType) {
    case TASK_TYPE.TODO:
      return moment(lastNotificationAt).add(1, 'day').toDate();
    case TASK_TYPE.EVENT:
      return moment(fieldValue.text).startOf('day').toDate();
    case TASK_TYPE.MEETING:
      return lastNotificationAt ? null : moment(fieldValue.text).subtract(1, 'hour').toDate();
    case TASK_TYPE.ROUTINE:
      const nextCycleAt = calculateNextCycle(fieldValue);
      return nextCycleAt ? nextCycleAt.toDate() : null;
  }
};

export const TaskModel: Model<ITaskDocument> = model('Task', TaskSchema);
