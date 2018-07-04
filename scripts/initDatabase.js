/* eslint no-undef: 0 */
/* eslint quotes: [0, 'double'] */
const dbHook = db.getSiblingDB(DB_NAME);

print(`Initializing db with name: ${DB_NAME}`);

if (dbHook.tasks) {
  dbHook.fieldtypes.drop();
  dbHook.settings.drop();
  dbHook.tasks.drop();
  dbHook.tasktypes.drop();
} else {
  dbHook.createCollection('fieldtypes');
  dbHook.createCollection('settings');
  dbHook.createCollection('tasks');
  dbHook.createCollection('tasktypes');
}

const FIELDS = {
  TITLE: {
    fieldId: 'TITLE',
    format: 'TEXT',
    type: 'text',
    order: 1,
    label: 'Title',
    helperText: 'Informacje o testowym polu Title',
    meta: {
      required: true,
      minLen: 0,
      maxLen: 400,
    },
  },
  PRIORITY: {
    fieldId: 'PRIORITY',
    format: 'BOOL',
    type: 'switch',
    order: 0,
    label: 'Important',
    helperText: 'Informacje o testowym polu Priority',
    meta: {
      required: true,
    },
  },
  ACTIVE: {
    fieldId: 'ACTIVE',
    format: 'BOOL',
    type: 'switch',
    order: 0,
    label: 'Active',
    helperText: 'Informacje o testowym polu Active',
    meta: {
      required: true,
    },
  },
  STATUS: {
    fieldId: 'STATUS',
    format: 'CHOICE',
    order: 0,
    type: 'select',
    label: 'Status',
    helperText: 'Informacje o testowym polu Status',
    meta: {
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
    format: 'TEXT',
    type: 'date-local',
    order: 4,
    label: 'Date',
    helperText: 'Informacje o testowym polu Date',
    meta: {
      required: false,
    },
  },
  DATE_TIME: {
    fieldId: 'DATE_TIME',
    format: 'TEXT',
    type: 'datetime-local',
    order: 3,
    label: 'Date',
    helperText: 'Informacje o testowym polu Date',
    meta: {
      required: false,
    },
  },
  DURATION: {
    fieldId: 'DURATION',
    format: 'TEXT',
    type: 'text',
    order: 3,
    label: 'Duration',
    helperText: 'Informacje o testowym polu Duration',
    meta: {
      required: false,
    },
  },
  LOCATION: {
    fieldId: 'LOCATION',
    format: 'TEXT',
    type: 'text',
    order: 3,
    label: 'Location',
    helperText: 'Informacje o testowym polu Location',
    meta: {
      required: false,
      minLen: 3,
      maxMax: 100,
    },
  },
  PERSON: {
    fieldId: 'PERSON',
    format: 'TEXT',
    order: 4,
    type: 'text',
    label: 'Person',
    helperText: 'Person helperText',
    meta: {
      required: true,
    },
  },
  NOTE: {
    fieldId: 'NOTE',
    format: 'TEXT',
    type: 'text',
    order: 2,
    label: 'Note',
    helperText: 'Informacje o testowym polu Description',
    meta: {
      required: false,
      minLen: 3,
      maxLen: 100,
    },
  },
  ACTION: {
    fieldId: 'ACTION',
    format: 'TEXT',
    type: 'text',
    order: 6,
    label: 'Action',
    helperText: 'Określ jaka akcja ma nastąpić podczas każdego cyklu',
    meta: {
      required: true,
      minLen: 3,
      maxLen: 100,
    },
  },
  CYCLE: {
    fieldId: 'CYCLE',
    format: 'CHOICE',
    type: 'select',
    order: 5,
    label: 'Cycle',
    helperText: 'Określ w jakich cyklach ma występować akcja',
    meta: {
      defaultValue: 'WEEK',
      required: true,
      options: [{
        text: 'Time',
        value: 'TIME'
      }, {
        text: 'Day',
        value: 'DAY'
      }, {
        text: 'Week',
        value: 'WEEK'
      }, {
        text: 'Month',
        value: 'MONTH'
      }],
    },
  },
  WHEN: {
    fieldId: 'WHEN',
    format: 'MULTIPLE_CHOICE_WITH_PARENT',
    type: 'multiple-select-with-parent',
    order: 5,
    label: 'When',
    helperText: 'Określ kiedy powtarzać cykl',
    meta: {
      parentId: 'CYCLE',
      optionsSet: [{
        customValueOptionMask: '9',
        parentValue: 'TIME',
        options: [{
          text: 'Half an hour',
          value: 'HALF_HOUR'
        }, {
          text: 'Hour',
          value: 'HOUR'
        }, {
          text: '3 hours',
          value: 'HOURS_3'
        }, {
          text: '12 hours',
          value: 'HOURS_12'
        }, {
          text: 'Interval in minutes',
          value: 'CUSTOM'
        }],
      }, {
        customValueOptionMask: '99:99',
        parentValue: 'DAY',
        options: [{
          text: 'Morning',
          value: 'MORNING'
        }, {
          text: 'Noon',
          value: 'NOON'
        }, {
          text: 'Evening',
          value: 'EVENING'
        }, {
          text: 'Time',
          value: 'CUSTOM'
        }],
      }, {
        parentValue: 'WEEK',
        options: [{
          text: 'Workday',
          value: 'WORKDAY'
        }, {
          text: 'Weekend',
          value: 'WEEKEND'
        }, {
          text: 'Monday',
          value: 'MONDAY'
        }, {
          text: 'Tuesday',
          value: 'TUESDAY'
        }, {
          text: 'Saturday',
          value: 'SATURDAY'
        }, {
          text: 'Sunday',
          value: 'SUNDAY'
        }],
      }, {
        customValueOptionMask: '99',
        parentValue: 'MONTH',
        options: [{
          text: 'At the begging',
          value: 'BEGIN'
        }, {
          text: 'In the middle',
          value: 'MIDDLE'
        }, {
          text: 'At the end',
          value: 'END'
        }, {
          text: 'Day',
          value: 'CUSTOM'
        }],
      }],
    },
  },
};

const assignFieldValue = (field, value = null) => {
  const { format } = field;

  if (format === 'BOOL') {
    return Object.assign({
      value: {
        bool: value,
      },
    }, field);
  }
  else if (format === 'CHOICE') {
    return Object.assign({
      value: {
        id: value,
      },
    }, field);
  }
  else if (format === 'NUMBER') {
    return Object.assign({
      value: {
        number: value,
      },
    }, field);
  }
  else if (format === 'MULTIPLE_CHOICE_WITH_PARENT') {
    return Object.assign({
      value: {
        ids: value,
        parentValue: null,
        customValueOptionValue: null,
      },
    }, field);
  }
  else if (format === 'TEXT') {
    return Object.assign({
      value: {
        text: value,
      },
    }, field);
  }

  print(['assignFieldValue:error'], `Nie znany format pola ${format}`);
};

// DANE TESTOWE
dbHook.fieldtypes.insert(FIELDS);
dbHook.settings.insert([{
  authentication: {
    provider: 'fake',
  },
  notifications: {
    show: true,
    daily: {
      events: false,
      meetings: true,
      todo: true,
      routines: false,
    },
    single: {
      events: true,
      meetings: false,
      todo: true,
      routines: false,
    },
  },
  ownerId: '1234567890',
}]);
dbHook.tasks.insert([
  {
    taskType: 'TODO',
    ownerId: '1234567890',
    fields: [
      {
        key: 'TITLE',
        value: 'To jest tytuł zadania typu ToDo'
      }, {
        key: 'PRIORITY',
        value: true,
      }, {
        key: 'STATUS',
        value: 'TODO',
      }, {
        key: 'NOTE',
        value: 'Notakta testowa. Może być długa i zawierać wiele wierszy.'
      }
    ].map(({ key, value }) => assignFieldValue(FIELDS[key], value)),
  },
  {
    taskType: 'TODO',
    ownerId: '1234567890',
    fields: [
      {
        key: 'TITLE',
        value: 'a To jest INNE zadanie typu ToDo'
      }, {
        key: 'PRIORITY',
        value: false,
      }, {
        key: 'STATUS',
        value: 'TODO',
      }, {
        key: 'NOTE',
        value: 'Super extra notatka wowow efekt placebo i kosmici. Notakta testowa. Może być długa i zawierać wiele wierszy.'
      }
    ].map(({ key, value }) => assignFieldValue(FIELDS[key], value)),
  },
]);

// KONFIGURACJA
// TYPY ZADAŃ
dbHook.tasktypes.insert([{
  typeId: 'TASK',
  name: '',
  description: 'Baza z tytułem',
  order: 0,
  isCustom: false,
  parentId: null,
  fields: [FIELDS.TITLE],
}, {
  typeId: 'PRIORITY',
  name: '',
  description: 'Baza z priorytetem',
  order: 0,
  isCustom: false,
  parentId: 'TASK',
  fields: [FIELDS.PRIORITY],
}, {
  typeId: 'STATUS',
  name: '',
  description: 'Baza ze statusem',
  order: 0,
  isCustom: false,
  parentId: 'TASK',
  fields: [FIELDS.STATUS],
}, {
  typeId: 'TODO',
  name: 'ToDo',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu',
  order: 0,
  isCustom: false,
  parentId: ['STATUS', 'PRIORITY'],
  fields: [FIELDS.NOTE],
}, {
  typeId: 'EVENT',
  name: 'Event',
  description: 'Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.',
  order: 1,
  isCustom: false,
  parentId: 'PRIORITY',
  fields: [FIELDS.LOCATION, FIELDS.DATE_TIME, FIELDS.DURATION],
}, {
  typeId: 'MEETING',
  name: 'Meeting',
  description: 'Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.',
  order: 2,
  isCustom: false,
  parentId: 'EVENT',
  fields: [FIELDS.PERSON],
}, {
  typeId: 'ROUTINE',
  name: 'Routine',
  description: 'Zadanie typu rutyna pozwala na ustawienie akcji do wykonania w danych cyklu.',
  order: 3,
  isCustom: false,
  parentId: 'PRIORITY',
  fields: [FIELDS.CYCLE, FIELDS.WHEN, FIELDS.ACTION, FIELDS.ACTIVE],
}]);

print('Collections:');
dbHook.getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${dbHook[name].count()}`);
});
