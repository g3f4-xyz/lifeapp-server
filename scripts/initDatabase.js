/* eslint no-undef: 0 */
/* eslint quotes: [0, 'double'] */
const dbHook = db.getSiblingDB(DB_NAME);

print(`Initializing db with name: ${DB_NAME}`);

if (dbHook.tasks) {
  dbHook.fields.drop();
  dbHook.settings.drop();
  dbHook.tasks.drop();
  dbHook.tasktypes.drop();
} else {
  dbHook.createCollection('fields');
  dbHook.createCollection('settings');
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
    fieldType: 'NESTED_CHOICE',
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
          parentValue: 'TIME_CYCLE',
          fieldType: 'NESTED_CHOICE',
          meta: {
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
              parentValue: 'MINUTES',
              fieldType: 'TEXT',
              meta: {
                label: 'Minutes time cycle',
                helperText: 'Minutes time cycle helperText',
                required: true,
                inputType: 'number',
              },
            }],
          },
        },
        {
          parentValue: 'DAY_CYCLE',
          fieldType: 'CHOICE',
          meta: {
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
          parentValue: 'WEEK_CYCLE',
          fieldType: 'CHOICE',
          meta: {
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
          parentValue: 'MONTH_CYCLE',
          fieldType: 'CHOICE',
          meta: {
            label: 'Month cycle',
            helperText: 'Month cycle helperText',
            required: true,
            options: [{
              text: 'Start of the month',
              value: 'MONTH_START',
            }, {
              text: 'End of the month',
              value: 'END_START',
            }, {
              text: 'Middle of the month',
              value: 'MIDDLE_START',
            }],
          },
        },
      ],
    },
  },
};

// DANE TESTOWE
dbHook.fields
  .insert(Object.keys(FIELDS_CONFIG)
    .map(fieldId => Object.assign({ fieldId }, FIELDS_CONFIG[fieldId])));

const findFieldByFieldId = fieldId => dbHook.fields.findOne({ fieldId });

// const FIELDS = Object.keys(FIELDS_CONFIG).map((fieldId) => {
//   const r = findFieldByType(fieldId);
//   const fieldConfig = FIELDS_CONFIG[fieldId];
//
//   fieldConfig.meta = r._id;
//
//   return fieldConfig;
// }).reduce((acc, field) => Object.assign({}, acc, { [field.fieldId]: field }), {});

// KONFIGURACJA
// TYPY ZADAŃ
dbHook.tasktypes.insert([{
  typeId: 'TASK',
  label: '',
  description: 'Pole bazowe',
  order: 0,
  parentTypeIds: [],
  fieldsIds: ['TITLE', 'PRIORITY', 'STATUS'],
}, {
  typeId: 'TODO',
  label: 'ToDo',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu',
  order: 0,
  parentTypeIds: ['TASK'],
  fieldsIds: ['NOTE'],
}, {
  typeId: 'EVENT',
  label: 'Event',
  description: 'Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.',
  order: 1,
  parentTypeIds: ['TASK'],
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

const assignFieldValue = (field, value = null) => {
  const { fieldType } = field;

  if (fieldType === 'SWITCH') {
    return Object.assign({
      value: {
        enabled: value,
      },
    }, field);
  } else if (fieldType === 'CHOICE') {
    return Object.assign({
      value: {
        id: value,
      },
    }, field);
  } else if (fieldType === 'TEXT') {
    return Object.assign({
      value: {
        text: value,
      },
    }, field);
  } else if (fieldType === 'NESTED_CHOICE') {
    return Object.assign({
      value: {
        ownValue: value,
        childrenValue: {
          ownValue: null,
          childrenValue: null,
        },
      },
    }, field);
  }

  print(['assignFieldValue:error'], `Nie znany typ pola ${fieldType}`);
};


dbHook.settings.insert([{
  notifications: {
    general: {
      show: true,
      vibrate: true,
    },
    types: {
      events: true,
      meetings: false,
      todos: true,
      routines: false,
    },
    subscriptions: [],
  },
  ownerId: '1234567890',
}]);
dbHook.tasks.insert([
  {
    taskType: 'TODO',
    ownerId: '1234567890',
    fields: [
      {
        fieldId: 'TITLE',
        value: 'To jest tytuł zadania typu ToDo',
      },
      {
        fieldId: 'PRIORITY',
        value: true,
      },
      {
        fieldId: 'STATUS',
        value: 'TODO',
      },
      {
        fieldId: 'NOTE',
        value: 'Notakta testowa. Może być długa i zawierać wiele wierszy.',
      },
    ].map(({ fieldId, value }) => assignFieldValue(findFieldByFieldId(fieldId), value)),
  },
  {
    taskType: 'TODO',
    ownerId: '1234567890',
    fields: [
      {
        fieldId: 'TITLE',
        value: 'a To jest INNE zadanie typu ToDo',
      },
      {
        fieldId: 'PRIORITY',
        value: false,
      },
      {
        fieldId: 'STATUS',
        value: 'TODO',
      },
      {
        fieldId: 'NOTE',
        value: 'Super extra notatka wowow efekt placebo i kosmici. Notakta testowa. Może być długa i zawierać wiele wierszy.',
      },
    ].map(({ fieldId, value }) => assignFieldValue(findFieldByFieldId(fieldId), value)),
  },
]);

print('Collections:');
dbHook.getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${dbHook[name].count()}`);
});
