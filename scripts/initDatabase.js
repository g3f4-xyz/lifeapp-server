/* eslint no-undef: 0 */
/* eslint quotes: [0, "double"] */
const dbHook = db.getSiblingDB(DB_NAME);

print(`Initializing db with name: ${DB_NAME}`);

if (dbHook.tasks) {
  dbHook.tasks.drop();
  dbHook.tasktypes.drop();
} else {
  dbHook.createCollection("tasks");
  dbHook.createCollection("tasktypes");
}

// DANE TESTOWE
dbHook.tasks.insert([
  {
    taskType: "TODO",
    ownerId: "1234567890",
    fields: [
      {
        fieldId: "TITLE",
        format: "TEXT",
        type: "text",
        order: -1,
        label: "Title",
        helperText: "Informacje o testowym polu Title",
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: "Wartość testowa pola Title",
        },
      }, {
        fieldId: "PRIORITY",
        format: "BOOL",
        type: "switch",
        order: -2,
        label: "Important",
        helperText: "Informacje o testowym polu Priority",
        meta: {
          required: true,
        },
        value: {
          bool: false,
        },
      },
      {
        fieldId: "STATUS",
        format: "CHOICE",
        order: -1,
        type: "select",
        label: "Status",
        helperText: "Informacje o testowym polu Status",
        meta: {
          required: true,
          options: [{
            text: "To do",
            value: "TODO",
          }, {
            text: "Done",
            value: "DONE",
          }, {
            text: "In progress",
            value: "IN_PROGRESS",
          }],
        },
        value: {
          id: "IN_PROGRESS",
        },
      },
      {
        fieldId: "NOTE",
        format: "TEXT",
        type: "text",
        order: 2,
        label: "Note",
        helperText: "Informacje o testowym polu Description",
        meta: {
          required: false,
          minLen: 3,
          maxLen: 100,
        },
        value: {
          text: "Wartość testowa pola Description",
        },
      },
    ],
  },
  {
    taskType: "TODO",
    ownerId: "1234567890",
    fields: [
      {
        fieldId: "TITLE",
        format: "TEXT",
        type: "text",
        order: -1,
        label: "Title",
        helperText: "Informacje o testowym polu Title",
        meta: {
          required: true,
          minLen: 0,
          maxLen: 400,
        },
        value: {
          text: "Wartość testowa pola Title",
        },
      }, {
        fieldId: "PRIORITY",
        format: "BOOL",
        type: "switch",
        order: -2,
        label: "Important",
        helperText: "Informacje o testowym polu Priority",
        meta: {
          required: true,
        },
        value: {
          bool: false,
        },
      },
      {
        fieldId: "STATUS",
        format: "CHOICE",
        order: -1,
        type: "select",
        label: "Status",
        helperText: "Informacje o testowym polu Status",
        meta: {
          required: true,
          options: [{
            text: "To do",
            value: "TODO",
          }, {
            text: "Done",
            value: "DONE",
          }, {
            text: "In progress",
            value: "IN_PROGRESS",
          }],
        },
        value: {
          id: "DONE",
        },
      },
      {
        fieldId: "NOTE",
        format: "TEXT",
        type: "text",
        order: 2,
        label: "Note",
        helperText: "Informacje o testowym polu Description",
        meta: {
          required: false,
          minLen: 3,
          maxMax: 100,
        },
        value: {
          text: "Wartość testowa pola Description",
        },
      },
      {
        fieldId: "LOCATION",
        format: "TEXT",
        type: "text",
        order: 3,
        label: "Location",
        helperText: "Informacje o testowym polu Location",
        meta: {
          required: false,
          minLen: 3,
          maxMax: 100,
        },
        value: {
          text: "Wartość testowa pola Location",
        },
      },
      {
        fieldId: "DATE",
        format: "TEXT",
        type: "datetime-local",
        order: 4,
        label: "Date",
        helperText: "Informacje o testowym polu Date",
        meta: {
          required: false,
        },
        value: {
          text: "Wartość testowa pola Date",
        },
      },
    ],
  },
]);

// KONFIGURACJA
// TYPY ZADAŃ
dbHook.tasktypes.insert([{
  typeId: "TODO",
  name: "ToDo",
  description: "Bazowe zadanie. Pozwala na ustawienie tytułu, priorytetu oraz sterowanie statusem. oraz dodanie opisu",
  order: 0,
  isCustom: false,
  parentId: null,
  fields: [{
    fieldId: "TITLE",
    format: "TEXT",
    order: 1,
    type: "text",
    label: "Title",
    helperText: "Title helperText",
    meta: {
      required: true,
      min: 0,
      max: 100,
    },
    value: {
      text: "",
    },
  }, {
    fieldId: "STATUS",
    format: "CHOICE",
    order: 0,
    type: "select",
    label: "Status",
    helperText: "Status helperText",
    meta: {
      required: true,
      options: [{
        text: "To do",
        value: "TODO",
      }, {
        text: "Done",
        value: "DONE",
      }, {
        text: "In progress",
        value: "IN_PROGRESS",
      }],
    },
    value: {
      id: "TODO",
    },
  }, {
    fieldId: "PRIORITY",
    format: "BOOL",
    type: "switch",
    order: 0,
    label: "Important",
    helperText: "Informacje o testowym polu Priority",
    meta: {
      required: true,
    },
    value: {
      bool: false,
    },
  }, {
    fieldId: "NOTE",
    format: "TEXT",
    order: 2,
    type: "text",
    label: "Note",
    helperText: "Note helperText",
    meta: {
      required: false,
      min: 0,
      max: 400,
    },
    value: {
      text: "",
    },
  }],
}, {
  typeId: "EVENT",
  name: "Event",
  description: "Wydarzenie pozwala na ustawienie zadania, które posiada możliwość zdefiniowania miejsca i czasu.",
  order: 1,
  isCustom: false,
  parentId: "TODO",
  fields: [{
    fieldId: "LOCATION",
    format: "TEXT",
    order: 3,
    type: "text",
    label: "Location",
    helperText: "Location helperText",
    meta: {
      required: false,
    },
    value: {
      text: "",
    },
  }, {
    fieldId: "DATE_TIME",
    format: "TEXT",
    order: 3,
    type: "datetime-local",
    label: "Date and time",
    helperText: "Date and time helperText",
    meta: {
      required: false,
    },
    value: {
      text: "",
    },
  }],
}, {
  typeId: "MEETING",
  name: "Meeting",
  description: "Zadanie typu spotkanie pozwala na zapisanie spotkania. Ustal osobę oraz czas i miejsce spotkania.",
  order: 2,
  isCustom: false,
  parentId: "EVENT",
  fields: [{
    fieldId: "PERSON",
    format: "TEXT",
    order: 4,
    type: "text",
    label: "Person",
    helperText: "Person helperText",
    meta: {
      required: true,
    },
    value: {
      text: "",
    },
  }],
}, {
  typeId: "CHECK_LIST",
  name: "Check list",
  description: "Zbiór pozwiązanych zadań do wykonania. Aby wykonać takie, należy wykonać wszystkie zadania powiązane.",
  order: 3,
  isCustom: false,
  parentId: "TODO",
  fields: [{
    fieldId: "RELATED_TASKS",
    format: "TEXT",
    order: 3,
    type: "text",
    label: "Related tasks",
    helperText: "Related tasks helperText",
    meta: {
      required: true,
      min: 1,
      max: 100,
    },
    value: {
      text: "",
    },
  }],
}]);

print('Collections:');
dbHook.getCollectionNames().forEach((name, index) => {
  print(`  ${index + 1}: name: ${name} | length: ${dbHook[name].count()}`);
});
