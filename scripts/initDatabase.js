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
    type: 'TEXT',
    order: 1,
    label: 'Title',
    helperText: 'Informacje o testowym polu Title',
    meta: {
      type: 'text',
      required: true,
      minLength: 0,
      maxLength: 400,
    },
  },
  PRIORITY: {
    fieldId: 'PRIORITY',
    type: 'SWITCH',
    order: 0,
    label: 'Important',
    helperText: 'Informacje o testowym polu Priority',
    meta: {
      required: true,
    },
  },
  ACTIVE: {
    fieldId: 'ACTIVE',
    type: 'SWITCH',
    order: 0,
    label: 'Active',
    helperText: 'Informacje o testowym polu Active',
    meta: {
      required: true,
    },
  },
  STATUS: {
    fieldId: 'STATUS',
    type: 'CHOICE',
    order: 0,
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
    type: 'TEXT',
    order: 4,
    label: 'Date',
    helperText: 'Informacje o testowym polu Date',
    meta: {
      type: 'date-local',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  DATE_TIME: {
    fieldId: 'DATE_TIME',
    type: 'TEXT',
    order: 3,
    label: 'Date',
    helperText: 'Informacje o testowym polu Date',
    meta: {
      type: 'datetime-local',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  DURATION: {
    fieldId: 'DURATION',
    type: 'TEXT',
    order: 3,
    label: 'Duration',
    helperText: 'Informacje o testowym polu Duration',
    meta: {
      type: 'text',
      required: false,
      minLength: 0,
      maxLength: 100,
    },
  },
  LOCATION: {
    fieldId: 'LOCATION',
    type: 'TEXT',
    order: 3,
    label: 'Location',
    helperText: 'Informacje o testowym polu Location',
    meta: {
      type: 'text',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  PERSON: {
    fieldId: 'PERSON',
    type: 'TEXT',
    order: 4,
    label: 'Person',
    helperText: 'Person helperText',
    meta: {
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  NOTE: {
    fieldId: 'NOTE',
    type: 'TEXT',
    order: 2,
    label: 'Note',
    helperText: 'Informacje o testowym polu Description',
    meta: {
      type: 'text',
      required: false,
      minLength: 3,
      maxLength: 100,
    },
  },
  ACTION: {
    fieldId: 'ACTION',
    type: 'TEXT',
    order: 6,
    label: 'Action',
    helperText: 'Określ jaka akcja ma nastąpić podczas każdego cyklu',
    meta: {
      type: 'text',
      required: true,
      minLength: 3,
      maxLength: 100,
    },
  },
  CYCLE: {
    fieldId: 'CYCLE',
    type: 'CHOICE',
    order: 5,
    label: 'Cycle',
    helperText: 'Określ w jakich cyklach ma występować akcja',
    meta: {
      required: true,
      defaultValue: 'WEEK',
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
    type: 'CHOICE',
    order: 5,
    label: 'When',
    helperText: 'Określ kiedy powtarzać cykl',
    meta: {
      required: true,
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
        value: 'MINUTES',
      }],
    },
  },
};

const assignFieldValue = (field, value = null) => {
  const { type } = field;

  if (type === 'SWITCH') {
    return Object.assign({
      value: {
        enabled: value,
      },
    }, field);
  }
  else if (type === 'CHOICE') {
    return Object.assign({
      value: {
        id: value,
      },
    }, field);
  }
  else if (type === 'MULTIPLE_CHOICE') {
    return Object.assign({
      value: {
        ids: value,
      },
    }, field);
  }
  else if (type === 'TEXT') {
    return Object.assign({
      value: {
        text: value,
      },
    }, field);
  }

  print(['assignFieldValue:error'], `Nie znany typ pola ${type}`);
};

// DANE TESTOWE
dbHook.fieldtypes.insert(FIELDS);
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
      },
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
      },
    ].map(({ key, value }) => assignFieldValue(FIELDS[key], value)),
  },
]);

// KONFIGURACJA
// TYPY ZADAŃ
dbHook.tasktypes.insert([{
  typeId: 'TASK',
  name: '',
  description: 'Pole bazowe',
  order: 0,
  parentID: [],
  fields: [FIELDS.TITLE, FIELDS.PRIORITY, FIELDS.STATUS],
}, {
  typeId: 'TODO',
  name: 'ToDo',
  description: 'Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu',
  order: 0,
  parentID: ['TASK'],
  fields: [FIELDS.NOTE],
}, {
  typeId: 'EVENT',
  name: 'Event',
  description: 'Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.',
  order: 1,
  parentID: ['TASK'],
  fields: [FIELDS.LOCATION, FIELDS.DATE_TIME, FIELDS.DURATION],
}, {
  typeId: 'MEETING',
  name: 'Meeting',
  description: 'Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.',
  order: 2,
  parentID: ['EVENT'],
  fields: [FIELDS.PERSON],
}, {
  typeId: 'ROUTINE',
  name: 'Routine',
  description: 'Zadanie typu rutyna pozwala na ustawienie akcji do wykonania w danych cyklu.',
  order: 3,
  parentID: ['TASK'],
  fields: [FIELDS.CYCLE, FIELDS.WHEN, FIELDS.ACTION, FIELDS.ACTIVE],
}]);

print('Collections:');
dbHook.getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${dbHook[name].count()}`);
});
