import { FIELD_ID, FIELD_ID_VALUE_MAP, FIELD_TYPE } from '../../../constants';
import { Field } from '../../interfaces';

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
      defaultOption: 'TODO',
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
