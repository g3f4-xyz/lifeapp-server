/* eslint no-undef: 0 */
/* eslint quotes: [0, 'double'] */
const dbHook = db.getSiblingDB(DB_NAME);

print(`Initializing db with name: ${DB_NAME}`);

if (dbHook.tasks) {
  dbHook.fields.drop();
  dbHook.tasks.drop();
  dbHook.tasktypes.drop();
} else {
  dbHook.createCollection('fields');
  dbHook.createCollection('tasks');
  dbHook.createCollection('tasktypes');
}

const FIELDS_CONFIG = {
  TITLE: {
    fieldId: 'TITLE',
    fieldType: 'TEXT',
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
    fieldId: 'PRIORITY',
    fieldType: 'SWITCH',
    order: 0,
    meta: {
      label: 'Important',
      helperText: 'Informacje o testowym polu Priority',
      required: true,
    },
  },
  ACTIVE: {
    fieldId: 'ACTIVE',
    fieldType: 'SWITCH',
    order: 0,
    meta: {
      label: 'Active',
      helperText: 'Informacje o testowym polu Active',
      required: true,
    },
  },
  STATUS: {
    fieldId: 'STATUS',
    fieldType: 'CHOICE',
    order: 0,
    meta: {
      label: 'Status',
      helperText: 'Informacje o testowym polu Status',
      required: true,
      options: [{
        text: 'To do',
        value: 'TODO',
      }, {
        text: 'Done',
        value: 'DONE',
      }, {
        text: 'In progress',
        value: 'IN_PROGRESS',
      }],
    },
  },
  DATE: {
    fieldId: 'DATE',
    fieldType: 'TEXT',
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
    fieldId: 'DATE_TIME',
    fieldType: 'TEXT',
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
    fieldId: 'DURATION',
    fieldType: 'TEXT',
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
    fieldId: 'LOCATION',
    fieldType: 'TEXT',
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
    fieldId: 'PERSON',
    fieldType: 'TEXT',
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
    fieldId: 'NOTE',
    fieldType: 'TEXT',
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
    fieldId: 'PROGRESS',
    fieldType: 'SLIDER',
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
    fieldId: 'ACTION',
    fieldType: 'TEXT',
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
    fieldId: 'CYCLE',
    fieldType: 'NESTED',
    order: 5,
    meta: {
      ownMeta: {
        fieldType: 'CHOICE',
        label: 'Cycle',
        helperText: 'Cycle helperText',
        required: true,
        options: [{
          text: 'Time',
          value: 'TIME_CYCLE',
        }, {
          text: 'Day',
          value: 'DAY_CYCLE',
        }, {
          text: 'Week',
          value: 'WEEK_CYCLE',
        }, {
          text: 'Month',
          value: 'MONTH_CYCLE',
        }],
      },
      childrenMeta: [
        {
          fieldType: 'NESTED',
          parentValue: {
            id: 'TIME_CYCLE',
          },
          ownMeta: {
            fieldType: 'CHOICE',
            label: 'Time cycle',
            helperText: 'Time cycle helperText',
            required: true,
            options: [{
              text: 'Half an hour',
              value: 'HALF_HOUR',
            }, {
              text: 'Hour',
              value: 'HOUR',
            }, {
              text: '3 hours',
              value: 'HOURS_3',
            }, {
              text: '12 hours',
              value: 'HOURS_12',
            }, {
              text: 'Interval in minutes',
              value: 'MINUTES',
            }],
          },
          childrenMeta: [{
            fieldType: 'NESTED',
            parentValue: {
              id: 'MINUTES',
            },
            ownMeta: {
              fieldType: 'TEXT',
              label: 'Minutes time cycle',
              helperText: 'Minutes time cycle helperText',
              required: true,
              inputType: 'number',
            },
          }],
        },
        {
          fieldType: 'NESTED',
          parentValue: {
            id: 'DAY_CYCLE',
          },
          ownMeta: {
            fieldType: 'CHOICE',
            label: 'Day cycle',
            helperText: 'Day cycle helperText',
            required: true,
            options: [{
              text: 'Morning',
              value: 'MORNING',
            }, {
              text: 'Noon',
              value: 'NOON',
            }, {
              text: 'Evening',
              value: 'EVENING',
            }],
          },
        },
        {
          fieldType: 'NESTED',
          parentValue: {
            id: 'WEEK_CYCLE',
          },
          ownMeta: {
            fieldType: 'CHOICE',
            label: 'Week cycle',
            helperText: 'Week cycle helperText',
            required: true,
            options: [{
              text: 'Week days',
              value: 'WEEK_DAYS',
            }, {
              text: 'Weekend',
              value: 'WEEKEND',
            }, {
              text: 'First day of week',
              value: 'FIRST_DAY',
            }, {
              text: 'Last day of week',
              value: 'LAST_DAY',
            }],
          },
        },
        {
          fieldType: 'NESTED',
          parentValue: {
            id: 'MONTH_CYCLE',
          },
          ownMeta: {
            fieldType: 'CHOICE',
            label: 'Month cycle',
            helperText: 'Month cycle helperText',
            required: true,
            options: [{
              text: 'Start of the month',
              value: 'MONTH_START',
            }, {
              text: 'End of the month',
              value: 'MONTH_END',
            }, {
              text: 'Middle of the month',
              value: 'MONTH_MIDDLE',
            }],
          },
        },
      ],
    },
  },
  NOTIFICATIONS: {
    fieldId: 'NOTIFICATIONS',
    fieldType: 'NESTED',
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
          fieldType: 'NESTED',
          parentValue: {
            enabled: true,
          },
          ownMeta: {
            fieldType: 'TEXT',
            label: 'Additional note',
            helperText: 'Additional note helperText',
            required: true,
          },
        },
      ],
    },
  },
};

dbHook.fields
  .insert(Object.keys(FIELDS_CONFIG)
    .map(fieldId => Object.assign({ fieldId }, FIELDS_CONFIG[fieldId])));

// TYPY ZADAŃ
dbHook.tasktypes.insert([{
  typeId: 'TASK',
  label: '',
  description: 'Pole bazowe',
  order: 0,
  fieldsIds: ['TITLE', 'PRIORITY', 'STATUS', 'NOTIFICATIONS'],
}, {
  typeId: 'TODO',
  label: 'ToDo',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu',
  order: 0,
  parentTypeIds: ['TASK'],
  fieldsIds: ['NOTE'],
}, {
  typeId: 'GOAL',
  label: 'Goal',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie postępu',
  order: 0,
  parentTypeIds: ['TASK'],
  fieldsIds: ['PROGRESS'],
}, {
  typeId: 'EVENT',
  label: 'Event',
  description: 'Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.',
  order: 1,
  parentTypeIds: ['TODO'],
  fieldsIds: ['LOCATION', 'DATE_TIME', 'DURATION'],
}, {
  typeId: 'MEETING',
  label: 'Meeting',
  description: 'Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.',
  order: 2,
  parentTypeIds: ['EVENT'],
  fieldsIds: ['PERSON'],
}, {
  typeId: 'ROUTINE',
  label: 'Routine',
  description: 'Zadanie typu rutyna pozwala na ustawienie akcji do wykonania w danych cyklu.',
  order: 3,
  parentTypeIds: ['TASK'],
  fieldsIds: ['CYCLE', 'ACTION', 'ACTIVE'],
}]);

print('Collections:');
dbHook.getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${dbHook[name].count()}`);
});
