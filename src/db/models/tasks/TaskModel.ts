import * as moment from 'moment-timezone';
import { Moment } from 'moment-timezone';
import { Document, Model, model, Schema } from 'mongoose';
import {
  CYCLE,
  DAY_CYCLE,
  FIELD_ID,
  FIELD_ID_VALUE_MAP,
  FIELD_TYPE,
  MONTH_CYCLE,
  TASK_TYPE,
  TASK_TYPE_VALUE_MAP,
  TIME_CYCLE,
  WEEK_CYCLE,
} from '../../../constants';

import { Field, FieldValue, Task } from '../../interfaces';
import { FieldSchema } from '../../schemas/FieldSchema';

export interface TaskDocument extends Task, Document {
  validateFields(this: TaskDocument): boolean;
}

export const TaskSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    taskType: {
      type: String,
      required: true,
    },
    updatedAt: Date,
    lastChangedFieldId: String,
    notificationAt: Date,
    lastNotificationAt: Date,
    fields: [FieldSchema],
  },
  { discriminatorKey: 'taskType' },
);

export const TaskModel = model<TaskDocument, Model<TaskDocument>>(
  'Task',
  TaskSchema,
);

export const TaskFieldsSchema = TaskSchema.path('fields');

export const isNotificationAtUpdateNeeded = (
  taskType: TASK_TYPE,
  lastChangedFieldId: FIELD_ID,
) => {
  switch (taskType) {
    case TASK_TYPE.ROUTINE:
      return lastChangedFieldId === FIELD_ID.CYCLE;
    case TASK_TYPE.MEETING:
      return lastChangedFieldId === FIELD_ID.DATE_TIME;
    default:
      return false;
  }
};

export const calculateNextCycle = (fieldValue: FieldValue): Moment | null => {
  if (fieldValue && fieldValue.ownValue) {
    if (
      fieldValue.ownValue.id === CYCLE.DAY &&
      fieldValue.childrenValue &&
      fieldValue.childrenValue.ownValue
    ) {
      switch ((fieldValue.childrenValue.ownValue.id as unknown) as DAY_CYCLE) {
        case DAY_CYCLE.EVENING: {
          const eveningMoment = moment(Date.now())
            .startOf('day')
            .add(20, 'hour');
          const pastEvening = moment(Date.now()).isAfter(eveningMoment);

          return pastEvening ? eveningMoment.add(1, 'day') : eveningMoment;
        }
        case DAY_CYCLE.MORNING: {
          const morningMoment = moment(Date.now())
            .startOf('day')
            .add(8, 'hour');
          const pastMorning = moment(Date.now()).isAfter(morningMoment);

          return pastMorning ? morningMoment.add(1, 'day') : morningMoment;
        }
        case DAY_CYCLE.NOON: {
          const noonMoment = moment(Date.now())
            .startOf('day')
            .add(12, 'hour');
          const pastNoon = moment(Date.now()).isAfter(noonMoment);

          return pastNoon ? noonMoment.add(1, 'day') : noonMoment;
        }
        default:
          return null;
      }
    }

    if (
      fieldValue.ownValue.id === CYCLE.MONTH &&
      fieldValue.childrenValue &&
      fieldValue.childrenValue.ownValue
    ) {
      switch (
        (fieldValue.childrenValue.ownValue.id as unknown) as MONTH_CYCLE
      ) {
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

    if (
      fieldValue.ownValue.id === CYCLE.WEEK &&
      fieldValue.childrenValue &&
      fieldValue.childrenValue.ownValue
    ) {
      switch ((fieldValue.childrenValue.ownValue.id as unknown) as WEEK_CYCLE) {
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

    if (
      fieldValue.ownValue.id === CYCLE.TIME &&
      fieldValue.childrenValue &&
      fieldValue.childrenValue.ownValue
    ) {
      switch ((fieldValue.childrenValue.ownValue.id as unknown) as TIME_CYCLE) {
        case TIME_CYCLE.HOUR:
          return moment(Date.now()).add(1, 'hour');
        case TIME_CYCLE.HOURS_3:
          return moment(Date.now()).add(3, 'hour');
        case TIME_CYCLE.HOURS_12:
          return moment(Date.now()).add(12, 'hour');
        case TIME_CYCLE.MINUTES:
          return fieldValue.childrenValue.childrenValue &&
            fieldValue.childrenValue.childrenValue.ownValue
            ? moment(Date.now()).add(
                parseInt(
                  fieldValue.childrenValue.childrenValue.ownValue.text,
                  10,
                ),
                'minute',
              )
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
  fieldValue: FieldValue,
): Date | null => {
  console.log(
    ['calculateNotificationAt'],
    taskType,
    lastNotificationAt,
    fieldValue,
  );
  switch (taskType) {
    case TASK_TYPE.TODO:
      return moment(lastNotificationAt)
        .add(1, 'day')
        .toDate();
    case TASK_TYPE.EVENT:
      return moment(fieldValue.text)
        .startOf('day')
        .toDate();
    case TASK_TYPE.MEETING:
      return lastNotificationAt
        ? null
        : moment(fieldValue.text)
            .subtract(1, 'hour')
            .toDate();
    case TASK_TYPE.ROUTINE: {
      const nextCycleAt = calculateNextCycle(fieldValue);

      return nextCycleAt ? nextCycleAt.toDate() : null;
    }
  }
};

export const FIELDS_CONFIG: FIELD_ID_VALUE_MAP<Partial<Field>> = {
  TITLE: {
    fieldId: FIELD_ID.TITLE,
    fieldType: FIELD_TYPE.TEXT,
    order: 1,
    meta: {
      label: 'Title',
      helperText: 'Informacje o testowym polu Title',
      inputType: 'text',
      required: true,
      minLength: 0,
      maxLength: 400,
    },
  },
  PRIORITY: {
    fieldId: FIELD_ID.PRIORITY,
    fieldType: FIELD_TYPE.SWITCH,
    order: 0,
    meta: {
      label: 'Important',
      helperText: 'Informacje o testowym polu Priority',
      required: true,
    },
  },
  STATUS: {
    fieldId: FIELD_ID.STATUS,
    fieldType: FIELD_TYPE.CHOICE,
    order: 0,
    meta: {
      label: 'Status',
      helperText: 'Informacje o testowym polu Status',
      required: true,
      options: [
        {
          text: 'To do',
          value: 'TODO',
        },
        {
          text: 'Done',
          value: 'DONE',
        },
        {
          text: 'In progress',
          value: 'IN_PROGRESS',
        },
      ],
    },
  },
  ACTIVE: {
    fieldId: FIELD_ID.ACTION,
    fieldType: FIELD_TYPE.SWITCH,
    order: 0,
    meta: {
      label: 'Active',
      helperText: 'Informacje o testowym polu Active',
    },
  },
  DATE: {
    fieldId: FIELD_ID.DATE,
    fieldType: FIELD_TYPE.TEXT,
    order: 4,
    meta: {
      label: 'Date',
      helperText: 'Informacje o testowym polu Date',
      inputType: 'date-local',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  DATE_TIME: {
    fieldId: FIELD_ID.DATE_TIME,
    fieldType: FIELD_TYPE.TEXT,
    order: 3,
    meta: {
      label: 'Date',
      helperText: 'Informacje o testowym polu Date',
      inputType: 'datetime-local',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  DURATION: {
    fieldId: FIELD_ID.DURATION,
    fieldType: FIELD_TYPE.TEXT,
    order: 3,
    meta: {
      label: 'Duration',
      helperText: 'Informacje o testowym polu Duration',
      inputType: 'text',
      required: false,
      minLength: 0,
      maxLength: 100,
    },
  },
  LOCATION: {
    fieldId: FIELD_ID.LOCATION,
    fieldType: FIELD_TYPE.TEXT,
    order: 3,
    meta: {
      label: 'Location',
      helperText: 'Informacje o testowym polu Location',
      inputType: 'text',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  PERSON: {
    fieldId: FIELD_ID.PERSON,
    fieldType: FIELD_TYPE.TEXT,
    order: 4,
    meta: {
      label: 'Person',
      helperText: 'Person helperText',
      inputType: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  NOTE: {
    fieldId: FIELD_ID.NOTE,
    fieldType: FIELD_TYPE.TEXT,
    order: 2,
    meta: {
      label: 'Note',
      helperText: 'Informacje o testowym polu Description',
      inputType: 'text',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  PROGRESS: {
    fieldId: FIELD_ID.PROGRESS,
    fieldType: FIELD_TYPE.SLIDER,
    order: 5,
    meta: {
      label: 'Progress',
      helperText: 'Informacje o testowym polu progress',
      required: false,
      step: 1,
      min: 0,
      max: 100,
    },
  },
  ACTION: {
    fieldId: FIELD_ID.ACTION,
    fieldType: FIELD_TYPE.TEXT,
    order: 6,
    meta: {
      label: 'Action',
      helperText: 'Określ jaka akcja ma nastąpić podczas każdego cyklu',
      inputType: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  CYCLE: {
    fieldId: FIELD_ID.CYCLE,
    fieldType: FIELD_TYPE.NESTED,
    order: 5,
    meta: {
      ownMeta: {
        fieldType: FIELD_TYPE.CHOICE,
        label: 'Cycle',
        helperText: 'Cycle helperText',
        required: true,
        options: [
          {
            text: 'Time',
            value: 'TIME_CYCLE',
          },
          {
            text: 'Day',
            value: 'DAY_CYCLE',
          },
          {
            text: 'Week',
            value: 'WEEK_CYCLE',
          },
          {
            text: 'Month',
            value: 'MONTH_CYCLE',
          },
        ],
      },
      childrenMeta: [
        {
          fieldType: FIELD_TYPE.NESTED,
          parentValue: {
            id: 'TIME_CYCLE',
          },
          ownMeta: {
            fieldType: FIELD_TYPE.CHOICE,
            label: 'Time cycle',
            helperText: 'Time cycle helperText',
            required: true,
            options: [
              {
                text: 'Half an hour',
                value: 'HALF_HOUR',
              },
              {
                text: 'Hour',
                value: 'HOUR',
              },
              {
                text: '3 hours',
                value: 'HOURS_3',
              },
              {
                text: '12 hours',
                value: 'HOURS_12',
              },
              {
                text: 'Interval in minutes',
                value: 'MINUTES',
              },
            ],
          },
          childrenMeta: [
            {
              fieldType: FIELD_TYPE.NESTED,
              parentValue: {
                id: 'MINUTES',
              },
              ownMeta: {
                fieldType: FIELD_TYPE.TEXT,
                label: 'Minutes time cycle',
                helperText: 'Minutes time cycle helperText',
                required: true,
                inputType: 'number',
              },
            },
          ],
        },
        {
          fieldType: FIELD_TYPE.NESTED,
          parentValue: {
            id: 'DAY_CYCLE',
          },
          ownMeta: {
            fieldType: FIELD_TYPE.CHOICE,
            label: 'Day cycle',
            helperText: 'Day cycle helperText',
            required: true,
            options: [
              {
                text: 'Morning',
                value: 'MORNING',
              },
              {
                text: 'Noon',
                value: 'NOON',
              },
              {
                text: 'Evening',
                value: 'EVENING',
              },
            ],
          },
        },
        {
          fieldType: FIELD_TYPE.NESTED,
          parentValue: {
            id: 'WEEK_CYCLE',
          },
          ownMeta: {
            fieldType: FIELD_TYPE.CHOICE,
            label: 'Week cycle',
            helperText: 'Week cycle helperText',
            required: true,
            options: [
              {
                text: 'Week days',
                value: 'WEEK_DAYS',
              },
              {
                text: 'Weekend',
                value: 'WEEKEND',
              },
              {
                text: 'First day of week',
                value: 'FIRST_DAY',
              },
              {
                text: 'Last day of week',
                value: 'LAST_DAY',
              },
            ],
          },
        },
        {
          fieldType: FIELD_TYPE.NESTED,
          parentValue: {
            id: 'MONTH_CYCLE',
          },
          ownMeta: {
            fieldType: FIELD_TYPE.CHOICE,
            label: 'Month cycle',
            helperText: 'Month cycle helperText',
            required: true,
            options: [
              {
                text: 'Start of the month',
                value: 'MONTH_START',
              },
              {
                text: 'End of the month',
                value: 'MONTH_END',
              },
              {
                text: 'Middle of the month',
                value: 'MONTH_MIDDLE',
              },
            ],
          },
        },
      ],
    },
  },
  NOTIFICATIONS: {
    fieldId: FIELD_ID.NOTIFICATIONS,
    fieldType: FIELD_TYPE.NESTED,
    order: 8,
    meta: {
      ownMeta: {
        fieldType: 'SWITCH',
        label: 'Notifications',
        helperText: 'Notifications helperText',
        disabled: false,
        required: true,
      },
      childrenMeta: [
        {
          fieldType: FIELD_TYPE.NESTED,
          parentValue: {
            enabled: true,
          },
          ownMeta: {
            fieldType: FIELD_TYPE.TEXT,
            label: 'Additional note',
            helperText: 'Additional note helperText',
            required: true,
          },
        },
      ],
    },
  },
};

export const TASK_FIELDS: TASK_TYPE_VALUE_MAP<Array<Partial<Field>>> = {
  EVENT: [
    FIELDS_CONFIG.TITLE,
    FIELDS_CONFIG.PRIORITY,
    FIELDS_CONFIG.STATUS,
    FIELDS_CONFIG.NOTE,
    FIELDS_CONFIG.LOCATION,
    FIELDS_CONFIG.DATE,
    FIELDS_CONFIG.DURATION,
    FIELDS_CONFIG.NOTIFICATIONS,
  ],
  GOAL: [
    FIELDS_CONFIG.TITLE,
    FIELDS_CONFIG.PRIORITY,
    FIELDS_CONFIG.STATUS,
    FIELDS_CONFIG.PROGRESS,
    FIELDS_CONFIG.NOTIFICATIONS,
  ],
  MEETING: [
    FIELDS_CONFIG.TITLE,
    FIELDS_CONFIG.PRIORITY,
    FIELDS_CONFIG.STATUS,
    FIELDS_CONFIG.NOTE,
    FIELDS_CONFIG.LOCATION,
    FIELDS_CONFIG.DATE_TIME,
    FIELDS_CONFIG.DURATION,
    FIELDS_CONFIG.PERSON,
    FIELDS_CONFIG.NOTIFICATIONS,
  ],
  ROUTINE: [
    FIELDS_CONFIG.TITLE,
    FIELDS_CONFIG.PRIORITY,
    FIELDS_CONFIG.STATUS,
    FIELDS_CONFIG.CYCLE,
    FIELDS_CONFIG.ACTION,
    FIELDS_CONFIG.NOTIFICATIONS,
  ],
  TODO: [
    FIELDS_CONFIG.TITLE,
    FIELDS_CONFIG.PRIORITY,
    FIELDS_CONFIG.STATUS,
    FIELDS_CONFIG.NOTE,
    FIELDS_CONFIG.NOTIFICATIONS,
  ],
};
