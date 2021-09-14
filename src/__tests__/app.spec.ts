import { ObjectId } from 'mongodb';
import { agent } from 'supertest';
import app from '../app';
import { TaskTypeId } from '../constants';
import { Settings, Task, TaskType } from '../db/interfaces';
import { SettingsModel } from '../db/models/settings/SettingsModel';
import { TaskModel } from '../db/models/tasks/TaskModel';
import { TaskTypeModel } from '../db/models/TaskTypeModel';
import mockMongoCollection from '../utils/tests/mockMongoCollection';
import setupMongo from '../utils/tests/setupMongo';

describe('app', () => {
  const firstUser = {
    id: '1234567890',
    subscriptionId: '5d94cb40d4b62b5aeec481c5',
    settingsId: '5d94cb40d4b62b5aeec481c6',
  };
  const secondUser = {
    id: '0987654321',
  };

  setupMongo({
    async beforeEachExtend() {
      await mockMongoCollection<Settings>(SettingsModel, [
        {
          _id: new ObjectId('5d94cb40d4b62b5aeec481c6'),
          ownerId: firstUser.id,
          notifications: {
            general: {
              show: true,
              vibrate: true,
            },
            types: {
              events: true,
              meetings: true,
              todos: true,
              routines: true,
              goals: true,
            },
            subscriptions: [
              {
                _id: new ObjectId(firstUser.subscriptionId),
                subscriptionData: {
                  endpoint: 'endpoint',
                  expirationTime: 'expirationTime',
                  keys: {
                    auth: 'auth',
                    p256dh: 'p256dh',
                  },
                },
                userAgent: 'userAgent',
                userDeviceType: 'userDeviceType',
              },
            ],
          },
          taskList: {
            filters: {
              title: '',
              taskType: Object.values(TaskTypeId),
              status: null,
            },
          },
        },
        {
          ownerId: secondUser.id,
          notifications: {
            general: {
              show: true,
              vibrate: true,
            },
            types: {
              events: true,
              meetings: true,
              todos: true,
              routines: true,
              goals: true,
            },
            subscriptions: [],
          },
          taskList: {
            filters: {
              title: '',
              taskType: Object.values(TaskTypeId),
              status: null,
            },
          },
        },
      ]);

      await mockMongoCollection<Task>(TaskModel, [
        {
          _id: new ObjectId('5d94cb40d4b62b5aeec482c1'),
          typeId: 'EVENT',
          ownerId: firstUser.id,
          updatedAt: new Date(Date.now()),
          fields: [
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec482c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec481c6'),
              fieldId: 'PRIORITY',
              fieldType: 'SWITCH',
              order: 0,
              meta: {
                label: 'Important',
                helperText: 'Informacje o testowym polu Priority',
                required: true,
              },
              value: {
                enabled: false,
              },
            },
            {
              _id: new ObjectId('5d94cb40d2b62b5aeec481c6'),
              fieldId: 'STATUS',
              fieldType: 'CHOICE',
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
              value: {
                id: '',
              },
            },
            {
              _id: new ObjectId('4d94cb40d4b62b5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb41d4b62b5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aaec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb41d4b62b5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94ab40d4b62b5aeec481c6'),
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
              value: {
                ownValue: null,
                childrenValue: null,
              },
            },
          ],
        },
        {
          _id: new ObjectId('5d94cb40d4b62b5aeec482c2'),
          typeId: 'GOAL',
          ownerId: firstUser.id,
          updatedAt: new Date(Date.now()),
          fields: [
            {
              _id: new ObjectId('5d94cb50d4b62b5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4c62b5aeec481c6'),
              fieldId: 'PRIORITY',
              fieldType: 'SWITCH',
              order: 0,
              meta: {
                label: 'Important',
                helperText: 'Informacje o testowym polu Priority',
                required: true,
              },
              value: {
                enabled: false,
              },
            },
            {
              _id: new ObjectId('5e94cb40d4b62b5aeec481c6'),
              fieldId: 'STATUS',
              fieldType: 'CHOICE',
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
              value: {
                id: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec491c6'),
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
              value: {
                progress: 0,
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec491c6'),
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
              value: {
                ownValue: null,
                childrenValue: null,
              },
            },
          ],
        },
        {
          _id: new ObjectId('5d94cb40d4b62b5aeec482c3'),
          typeId: 'MEETING',
          ownerId: firstUser.id,
          updatedAt: new Date(Date.now()),
          fields: [
            {
              _id: new ObjectId('5d94cb40d4b62b5aeea481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec581c6'),
              fieldId: 'PRIORITY',
              fieldType: 'SWITCH',
              order: 0,
              meta: {
                label: 'Important',
                helperText: 'Informacje o testowym polu Priority',
                required: true,
              },
              value: {
                enabled: false,
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5ceec481c6'),
              fieldId: 'STATUS',
              fieldType: 'CHOICE',
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
              value: {
                id: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec481c7'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec481c8'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec481c9'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec481c2'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeea481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40ddb62b5aeec481c6'),
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
              value: {
                ownValue: null,
                childrenValue: null,
              },
            },
          ],
        },
        {
          _id: new ObjectId('5d94cb40dab62b5aeec481c4'),
          typeId: 'ROUTINE',
          ownerId: firstUser.id,
          updatedAt: new Date(Date.now()),
          fields: [
            {
              _id: new ObjectId('5d94cb40aab62b5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40dab62b5aeec481c6'),
              fieldId: 'PRIORITY',
              fieldType: 'SWITCH',
              order: 0,
              meta: {
                label: 'Important',
                helperText: 'Informacje o testowym polu Priority',
                required: true,
              },
              value: {
                enabled: false,
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeea481c6'),
              fieldId: 'STATUS',
              fieldType: 'CHOICE',
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
              value: {
                id: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4a62b5aeec481c6'),
              fieldId: 'CYCLE',
              fieldType: 'NESTED',
              order: 5,
              meta: {
                ownMeta: {
                  fieldType: 'CHOICE',
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
                    fieldType: 'NESTED',
                    parentValue: {
                      id: 'TIME_CYCLE',
                    },
                    ownMeta: {
                      fieldType: 'CHOICE',
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
                      },
                    ],
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
                    fieldType: 'NESTED',
                    parentValue: {
                      id: 'WEEK_CYCLE',
                    },
                    ownMeta: {
                      fieldType: 'CHOICE',
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
                    fieldType: 'NESTED',
                    parentValue: {
                      id: 'MONTH_CYCLE',
                    },
                    ownMeta: {
                      fieldType: 'CHOICE',
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
              value: {
                ownValue: null,
                childrenValue: null,
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b6215aeec481c6'),
              fieldId: 'ACTION',
              fieldType: 'TEXT',
              order: 6,
              meta: {
                label: 'Action',
                helperText:
                  'Określ jaka akcja ma nastąpić podczas każdego cyklu',
                inputType: 'text',
                required: true,
                minLength: 3,
                maxLength: 100,
              },
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec181c6'),
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
              value: {
                ownValue: null,
                childrenValue: null,
              },
            },
          ],
        },
        {
          _id: new ObjectId('5d94cb40d4b62b5aeec482c5'),
          typeId: 'TODO',
          ownerId: firstUser.id,
          updatedAt: new Date(Date.now()),
          fields: [
            {
              _id: new ObjectId('5d94cb40d4b62a5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb41d4b62b5aeec481c6'),
              fieldId: 'PRIORITY',
              fieldType: 'SWITCH',
              order: 0,
              meta: {
                label: 'Important',
                helperText: 'Informacje o testowym polu Priority',
                required: true,
              },
              value: {
                enabled: false,
              },
            },
            {
              _id: new ObjectId('5a94cb40d4b62b5aeec481c6'),
              fieldId: 'STATUS',
              fieldType: 'CHOICE',
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
              value: {
                id: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62a5aeec481c6'),
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
              value: {
                text: '',
              },
            },
            {
              _id: new ObjectId('5d94cb40d4b62b5aeec471c6'),
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
              value: {
                ownValue: null,
                childrenValue: null,
              },
            },
          ],
        },
      ]);

      await mockMongoCollection<TaskType>(TaskTypeModel, [
        {
          typeId: 'EVENT',
          label: 'string',
          description: 'string',
          parentTypeIds: ['TASK'],
          fieldsIds: ['string'],
        },
        {
          typeId: 'GOAL',
          label: 'string',
          description: 'string',
          parentTypeIds: ['TASK'],
          fieldsIds: ['string'],
        },
        {
          typeId: 'MEETING',
          label: 'string',
          description: 'string',
          parentTypeIds: ['TASK'],
          fieldsIds: ['string'],
        },
        {
          typeId: 'ROUTINE',
          label: 'string',
          description: 'string',
          parentTypeIds: ['TASK'],
          fieldsIds: ['string'],
        },
        {
          typeId: 'TODO',
          label: 'string',
          description: 'string',
          parentTypeIds: ['TASK'],
          fieldsIds: ['string'],
        },
      ]);
    },
  });

  it('should return task list', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        query:
          'query useTaskListQuery(  $count: Int!  $after: String) {  app {    taskList {      ...useTaskListPagination      id    }    settings {      id      taskList {        filters {          title          taskType          status        }      }    }    id  }}fragment useTaskListPagination on TaskListType {  id  list(first: $count, after: $after) {    edges {      cursor      node {        id        ...useTaskListFragment        __typename      }    }    pageInfo {      hasNextPage      endCursor    }  }}fragment useTaskListFragment on TaskType {  id  taskType  fields {    __typename    ... on SliderFieldType {      id      fieldId      meta {        fieldType        label        disabled        required        max        min        step      }      value {        progress      }    }    ... on SwitchFieldType {      id      fieldId      meta {        fieldType        label        disabled        required      }      value {        enabled      }    }    ... on ChoiceFieldType {      id      fieldId      meta {        fieldType        helperText        label        defaultValue        options {          text          value        }        required      }      value {        id      }    }    ... on TextFieldType {      id      fieldId      meta {        fieldType        helperText        label        inputType        min        max        maxLength        minLength        required      }      value {        text      }    }    ... on NestedFieldType {      id      fieldId      meta {        fieldType        parentValue {          __typename          ... on SwitchValueType {            enabled          }          ... on TextValueType {            text          }          ... on ChoiceValueType {            id          }        }        ownMeta {          __typename          ... on ChoiceMetaType {            fieldType            helperText            label            defaultValue            options {              text              value            }            required          }          ... on TextMetaType {            fieldType            helperText            label            inputType            min            max            maxLength            minLength            required          }          ... on SwitchMetaType {            fieldType            label            disabled            required          }        }        childrenMeta {          fieldType          parentValue {            __typename            ... on SwitchValueType {              enabled            }            ... on TextValueType {              text            }            ... on ChoiceValueType {              id            }          }          ownMeta {            __typename            ... on ChoiceMetaType {              fieldType              helperText              label              defaultValue              options {                text                value              }              required            }            ... on TextMetaType {              fieldType              helperText              label              inputType              min              max              maxLength              minLength              required            }            ... on SwitchMetaType {              fieldType              label              disabled              required            }            ... on NestedMetaType {              parentValue {                __typename                ... on SwitchValueType {                  enabled                }                ... on TextValueType {                  text                }                ... on ChoiceValueType {                  id                }              }              ownMeta {                __typename                ... on ChoiceMetaType {                  fieldType                  helperText                  label                  defaultValue                  options {                    text                    value                  }                  required                }                ... on TextMetaType {                  fieldType                  helperText                  label                  inputType                  min                  max                  maxLength                  minLength                  required                }                ... on SwitchMetaType {                  fieldType                  label                  disabled                  required                }              }              childrenMeta {                fieldType                parentValue {                  __typename                  ... on SwitchValueType {                    enabled                  }                  ... on TextValueType {                    text                  }                  ... on ChoiceValueType {                    id                  }                }                ownMeta {                  __typename                  ... on ChoiceMetaType {                    fieldType                    helperText                    label                    defaultValue                    options {                      text                      value                    }                    required                  }                  ... on TextMetaType {                    fieldType                    helperText                    label                    inputType                    min                    max                    maxLength                    minLength                    required                  }                  ... on SwitchMetaType {                    fieldType                    label                    disabled                    required                  }                }              }            }          }          childrenMeta {            fieldType            parentValue {              __typename              ... on SwitchValueType {                enabled              }              ... on TextValueType {                text              }              ... on ChoiceValueType {                id              }            }            ownMeta {              __typename              ... on ChoiceMetaType {                fieldType                helperText                label                defaultValue                options {                  text                  value                }                required              }              ... on TextMetaType {                fieldType                helperText                label                inputType                min                max                maxLength                minLength                required              }              ... on SwitchMetaType {                fieldType                label                disabled                required              }              ... on NestedMetaType {                parentValue {                  __typename                  ... on SwitchValueType {                    enabled                  }                  ... on TextValueType {                    text                  }                  ... on ChoiceValueType {                    id                  }                }                ownMeta {                  __typename                  ... on ChoiceMetaType {                    fieldType                    helperText                    label                    defaultValue                    options {                      text                      value                    }                    required                  }                  ... on TextMetaType {                    fieldType                    helperText                    label                    inputType                    min                    max                    maxLength                    minLength                    required                  }                  ... on SwitchMetaType {                    fieldType                    label                    disabled                    required                  }                }                childrenMeta {                  fieldType                  parentValue {                    __typename                    ... on SwitchValueType {                      enabled                    }                    ... on TextValueType {                      text                    }                    ... on ChoiceValueType {                      id                    }                  }                  ownMeta {                    __typename                    ... on ChoiceMetaType {                      fieldType                      helperText                      label                      defaultValue                      options {                        text                        value                      }                      required                    }                    ... on TextMetaType {                      fieldType                      helperText                      label                      inputType                      min                      max                      maxLength                      minLength                      required                    }                    ... on SwitchMetaType {                      fieldType                      label                      disabled                      required                    }                  }                }              }            }          }        }      }      value {        ownValue {          __typename          ... on SwitchValueType {            enabled          }          ... on TextValueType {            text          }          ... on ChoiceValueType {            id          }        }        childrenValue {          ownValue {            __typename            ... on SwitchValueType {              enabled            }            ... on TextValueType {              text            }            ... on ChoiceValueType {              id            }          }          childrenValue {            ownValue {              __typename              ... on SwitchValueType {                enabled              }              ... on TextValueType {                text              }              ... on ChoiceValueType {                id              }            }          }        }      }    }    ... on Node {      id    }  }}',
        variables: {
          after: null,
          count: 5,
        },
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          taskList: {
            id: 'VGFza0xpc3Q6',
            list: {
              edges: [
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                  node: {
                    id: 'VGFza1R5cGU6NWQ5NGNiNDBkNGI2MmI1YWVlYzQ4MmMx',
                    taskType: 'EVENT',
                    fields: [
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgyYzY=',
                        fieldId: 'TITLE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Title',
                          label: 'Title',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 400,
                          minLength: 0,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'SwitchFieldType',
                        id:
                          'U3dpdGNoRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'PRIORITY',
                        meta: {
                          fieldType: 'SWITCH',
                          label: 'Important',
                          disabled: false,
                          required: true,
                        },
                        value: {
                          enabled: false,
                        },
                      },
                      {
                        __typename: 'ChoiceFieldType',
                        id:
                          'Q2hvaWNlRmllbGRUeXBlOjVkOTRjYjQwZDJiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'STATUS',
                        meta: {
                          fieldType: 'CHOICE',
                          helperText: 'Informacje o testowym polu Status',
                          label: 'Status',
                          defaultValue: null,
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
                          required: true,
                        },
                        value: {
                          id: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo0ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgxYzY=',
                        fieldId: 'NOTE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Description',
                          label: 'Note',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MWQ0YjYyYjVhZWVjNDgxYzY=',
                        fieldId: 'LOCATION',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Location',
                          label: 'Location',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhYWVjNDgxYzY=',
                        fieldId: 'DATE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Date',
                          label: 'Date',
                          inputType: 'date-local',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MWQ0YjYyYjVhZWVjNDgxYzY=',
                        fieldId: 'DURATION',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Duration',
                          label: 'Duration',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 0,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'NestedFieldType',
                        id:
                          'TmVzdGVkRmllbGRUeXBlOjVkOTRhYjQwZDRiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'NOTIFICATIONS',
                        meta: {
                          fieldType: 'NESTED',
                          parentValue: null,
                          ownMeta: {
                            __typename: 'SwitchMetaType',
                            fieldType: 'SWITCH',
                            label: 'Notifications',
                            disabled: false,
                            required: true,
                          },
                          childrenMeta: [
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'SwitchValueType',
                                enabled: true,
                              },
                              ownMeta: {
                                __typename: 'TextMetaType',
                                fieldType: 'TEXT',
                                helperText: 'Additional note helperText',
                                label: 'Additional note',
                                inputType: null,
                                min: null,
                                max: null,
                                maxLength: null,
                                minLength: null,
                                required: true,
                              },
                              childrenMeta: null,
                            },
                          ],
                        },
                        value: {
                          ownValue: null,
                          childrenValue: null,
                        },
                      },
                    ],
                    __typename: 'TaskType',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                  node: {
                    id: 'VGFza1R5cGU6NWQ5NGNiNDBkNGI2MmI1YWVlYzQ4MmMy',
                    taskType: 'GOAL',
                    fields: [
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I1MGQ0YjYyYjVhZWVjNDgxYzY=',
                        fieldId: 'TITLE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Title',
                          label: 'Title',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 400,
                          minLength: 0,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'SwitchFieldType',
                        id:
                          'U3dpdGNoRmllbGRUeXBlOjVkOTRjYjQwZDRjNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'PRIORITY',
                        meta: {
                          fieldType: 'SWITCH',
                          label: 'Important',
                          disabled: false,
                          required: true,
                        },
                        value: {
                          enabled: false,
                        },
                      },
                      {
                        __typename: 'ChoiceFieldType',
                        id:
                          'Q2hvaWNlRmllbGRUeXBlOjVlOTRjYjQwZDRiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'STATUS',
                        meta: {
                          fieldType: 'CHOICE',
                          helperText: 'Informacje o testowym polu Status',
                          label: 'Status',
                          defaultValue: null,
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
                          required: true,
                        },
                        value: {
                          id: '',
                        },
                      },
                      {
                        __typename: 'SliderFieldType',
                        id:
                          'U2xpZGVyRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0OTFjNg==',
                        fieldId: 'PROGRESS',
                        meta: {
                          fieldType: 'SLIDER',
                          label: 'Progress',
                          disabled: false,
                          required: false,
                          max: 100,
                          min: 0,
                          step: 1,
                        },
                        value: {
                          progress: 0,
                        },
                      },
                      {
                        __typename: 'NestedFieldType',
                        id:
                          'TmVzdGVkRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0OTFjNg==',
                        fieldId: 'NOTIFICATIONS',
                        meta: {
                          fieldType: 'NESTED',
                          parentValue: null,
                          ownMeta: {
                            __typename: 'SwitchMetaType',
                            fieldType: 'SWITCH',
                            label: 'Notifications',
                            disabled: false,
                            required: true,
                          },
                          childrenMeta: [
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'SwitchValueType',
                                enabled: true,
                              },
                              ownMeta: {
                                __typename: 'TextMetaType',
                                fieldType: 'TEXT',
                                helperText: 'Additional note helperText',
                                label: 'Additional note',
                                inputType: null,
                                min: null,
                                max: null,
                                maxLength: null,
                                minLength: null,
                                required: true,
                              },
                              childrenMeta: null,
                            },
                          ],
                        },
                        value: {
                          ownValue: null,
                          childrenValue: null,
                        },
                      },
                    ],
                    __typename: 'TaskType',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                  node: {
                    id: 'VGFza1R5cGU6NWQ5NGNiNDBkNGI2MmI1YWVlYzQ4MmMz',
                    taskType: 'MEETING',
                    fields: [
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVhNDgxYzY=',
                        fieldId: 'TITLE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Title',
                          label: 'Title',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 400,
                          minLength: 0,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'SwitchFieldType',
                        id:
                          'U3dpdGNoRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM1ODFjNg==',
                        fieldId: 'PRIORITY',
                        meta: {
                          fieldType: 'SWITCH',
                          label: 'Important',
                          disabled: false,
                          required: true,
                        },
                        value: {
                          enabled: false,
                        },
                      },
                      {
                        __typename: 'ChoiceFieldType',
                        id:
                          'Q2hvaWNlRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWNlZWM0ODFjNg==',
                        fieldId: 'STATUS',
                        meta: {
                          fieldType: 'CHOICE',
                          helperText: 'Informacje o testowym polu Status',
                          label: 'Status',
                          defaultValue: null,
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
                          required: true,
                        },
                        value: {
                          id: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgxYzc=',
                        fieldId: 'NOTE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Description',
                          label: 'Note',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgxYzg=',
                        fieldId: 'LOCATION',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Location',
                          label: 'Location',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgxYzk=',
                        fieldId: 'DATE_TIME',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Date',
                          label: 'Date',
                          inputType: 'datetime-local',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgxYzI=',
                        fieldId: 'DURATION',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Duration',
                          label: 'Duration',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 0,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVhNDgxYzY=',
                        fieldId: 'PERSON',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Person helperText',
                          label: 'Person',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'NestedFieldType',
                        id:
                          'TmVzdGVkRmllbGRUeXBlOjVkOTRjYjQwZGRiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'NOTIFICATIONS',
                        meta: {
                          fieldType: 'NESTED',
                          parentValue: null,
                          ownMeta: {
                            __typename: 'SwitchMetaType',
                            fieldType: 'SWITCH',
                            label: 'Notifications',
                            disabled: false,
                            required: true,
                          },
                          childrenMeta: [
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'SwitchValueType',
                                enabled: true,
                              },
                              ownMeta: {
                                __typename: 'TextMetaType',
                                fieldType: 'TEXT',
                                helperText: 'Additional note helperText',
                                label: 'Additional note',
                                inputType: null,
                                min: null,
                                max: null,
                                maxLength: null,
                                minLength: null,
                                required: true,
                              },
                              childrenMeta: null,
                            },
                          ],
                        },
                        value: {
                          ownValue: null,
                          childrenValue: null,
                        },
                      },
                    ],
                    __typename: 'TaskType',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjM=',
                  node: {
                    id: 'VGFza1R5cGU6NWQ5NGNiNDBkYWI2MmI1YWVlYzQ4MWM0',
                    taskType: 'ROUTINE',
                    fields: [
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGFhYjYyYjVhZWVjNDgxYzY=',
                        fieldId: 'TITLE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Title',
                          label: 'Title',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 400,
                          minLength: 0,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'SwitchFieldType',
                        id:
                          'U3dpdGNoRmllbGRUeXBlOjVkOTRjYjQwZGFiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'PRIORITY',
                        meta: {
                          fieldType: 'SWITCH',
                          label: 'Important',
                          disabled: false,
                          required: true,
                        },
                        value: {
                          enabled: false,
                        },
                      },
                      {
                        __typename: 'ChoiceFieldType',
                        id:
                          'Q2hvaWNlRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWE0ODFjNg==',
                        fieldId: 'STATUS',
                        meta: {
                          fieldType: 'CHOICE',
                          helperText: 'Informacje o testowym polu Status',
                          label: 'Status',
                          defaultValue: null,
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
                          required: true,
                        },
                        value: {
                          id: '',
                        },
                      },
                      {
                        __typename: 'NestedFieldType',
                        id:
                          'TmVzdGVkRmllbGRUeXBlOjVkOTRjYjQwZDRhNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'CYCLE',
                        meta: {
                          fieldType: 'NESTED',
                          parentValue: null,
                          ownMeta: {
                            __typename: 'ChoiceMetaType',
                            fieldType: 'CHOICE',
                            helperText: 'Cycle helperText',
                            label: 'Cycle',
                            defaultValue: null,
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
                            required: true,
                          },
                          childrenMeta: [
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'ChoiceValueType',
                                id: 'TIME_CYCLE',
                              },
                              ownMeta: {
                                __typename: 'ChoiceMetaType',
                                fieldType: 'CHOICE',
                                helperText: 'Time cycle helperText',
                                label: 'Time cycle',
                                defaultValue: null,
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
                                required: true,
                              },
                              childrenMeta: [
                                {
                                  fieldType: 'NESTED',
                                  parentValue: {
                                    __typename: 'ChoiceValueType',
                                    id: 'MINUTES',
                                  },
                                  ownMeta: {
                                    __typename: 'TextMetaType',
                                    fieldType: 'TEXT',
                                    helperText: 'Minutes time cycle helperText',
                                    label: 'Minutes time cycle',
                                    inputType: 'number',
                                    min: null,
                                    max: null,
                                    maxLength: null,
                                    minLength: null,
                                    required: true,
                                  },
                                },
                              ],
                            },
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'ChoiceValueType',
                                id: 'DAY_CYCLE',
                              },
                              ownMeta: {
                                __typename: 'ChoiceMetaType',
                                fieldType: 'CHOICE',
                                helperText: 'Day cycle helperText',
                                label: 'Day cycle',
                                defaultValue: null,
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
                                required: true,
                              },
                              childrenMeta: null,
                            },
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'ChoiceValueType',
                                id: 'WEEK_CYCLE',
                              },
                              ownMeta: {
                                __typename: 'ChoiceMetaType',
                                fieldType: 'CHOICE',
                                helperText: 'Week cycle helperText',
                                label: 'Week cycle',
                                defaultValue: null,
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
                                required: true,
                              },
                              childrenMeta: null,
                            },
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'ChoiceValueType',
                                id: 'MONTH_CYCLE',
                              },
                              ownMeta: {
                                __typename: 'ChoiceMetaType',
                                fieldType: 'CHOICE',
                                helperText: 'Month cycle helperText',
                                label: 'Month cycle',
                                defaultValue: null,
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
                                required: true,
                              },
                              childrenMeta: null,
                            },
                          ],
                        },
                        value: {
                          ownValue: null,
                          childrenValue: null,
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyMTVhZWVjNDgxYzY=',
                        fieldId: 'ACTION',
                        meta: {
                          fieldType: 'TEXT',
                          helperText:
                            'Określ jaka akcja ma nastąpić podczas każdego cyklu',
                          label: 'Action',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'NestedFieldType',
                        id:
                          'TmVzdGVkRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWMxODFjNg==',
                        fieldId: 'NOTIFICATIONS',
                        meta: {
                          fieldType: 'NESTED',
                          parentValue: null,
                          ownMeta: {
                            __typename: 'SwitchMetaType',
                            fieldType: 'SWITCH',
                            label: 'Notifications',
                            disabled: false,
                            required: true,
                          },
                          childrenMeta: [
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'SwitchValueType',
                                enabled: true,
                              },
                              ownMeta: {
                                __typename: 'TextMetaType',
                                fieldType: 'TEXT',
                                helperText: 'Additional note helperText',
                                label: 'Additional note',
                                inputType: null,
                                min: null,
                                max: null,
                                maxLength: null,
                                minLength: null,
                                required: true,
                              },
                              childrenMeta: null,
                            },
                          ],
                        },
                        value: {
                          ownValue: null,
                          childrenValue: null,
                        },
                      },
                    ],
                    __typename: 'TaskType',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                  node: {
                    id: 'VGFza1R5cGU6NWQ5NGNiNDBkNGI2MmI1YWVlYzQ4MmM1',
                    taskType: 'TODO',
                    fields: [
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYTVhZWVjNDgxYzY=',
                        fieldId: 'TITLE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Title',
                          label: 'Title',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 400,
                          minLength: 0,
                          required: true,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'SwitchFieldType',
                        id:
                          'U3dpdGNoRmllbGRUeXBlOjVkOTRjYjQxZDRiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'PRIORITY',
                        meta: {
                          fieldType: 'SWITCH',
                          label: 'Important',
                          disabled: false,
                          required: true,
                        },
                        value: {
                          enabled: false,
                        },
                      },
                      {
                        __typename: 'ChoiceFieldType',
                        id:
                          'Q2hvaWNlRmllbGRUeXBlOjVhOTRjYjQwZDRiNjJiNWFlZWM0ODFjNg==',
                        fieldId: 'STATUS',
                        meta: {
                          fieldType: 'CHOICE',
                          helperText: 'Informacje o testowym polu Status',
                          label: 'Status',
                          defaultValue: null,
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
                          required: true,
                        },
                        value: {
                          id: '',
                        },
                      },
                      {
                        __typename: 'TextFieldType',
                        id:
                          'VGV4dEZpZWxkVHlwZTo1ZDk0Y2I0MGQ0YjYyYTVhZWVjNDgxYzY=',
                        fieldId: 'NOTE',
                        meta: {
                          fieldType: 'TEXT',
                          helperText: 'Informacje o testowym polu Description',
                          label: 'Note',
                          inputType: 'text',
                          min: null,
                          max: null,
                          maxLength: 100,
                          minLength: 3,
                          required: false,
                        },
                        value: {
                          text: '',
                        },
                      },
                      {
                        __typename: 'NestedFieldType',
                        id:
                          'TmVzdGVkRmllbGRUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0NzFjNg==',
                        fieldId: 'NOTIFICATIONS',
                        meta: {
                          fieldType: 'NESTED',
                          parentValue: null,
                          ownMeta: {
                            __typename: 'SwitchMetaType',
                            fieldType: 'SWITCH',
                            label: 'Notifications',
                            disabled: false,
                            required: true,
                          },
                          childrenMeta: [
                            {
                              fieldType: 'NESTED',
                              parentValue: {
                                __typename: 'SwitchValueType',
                                enabled: true,
                              },
                              ownMeta: {
                                __typename: 'TextMetaType',
                                fieldType: 'TEXT',
                                helperText: 'Additional note helperText',
                                label: 'Additional note',
                                inputType: null,
                                min: null,
                                max: null,
                                maxLength: null,
                                minLength: null,
                                required: true,
                              },
                              childrenMeta: null,
                            },
                          ],
                        },
                        value: {
                          ownValue: null,
                          childrenValue: null,
                        },
                      },
                    ],
                    __typename: 'TaskType',
                  },
                },
              ],
              pageInfo: {
                hasNextPage: false,
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
              },
            },
          },
          settings: {
            id: 'U2V0dGluZ3NUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODFjNg==',
            taskList: {
              filters: {
                title: '',
                taskType: ['GOAL', 'TODO', 'MEETING', 'EVENT', 'ROUTINE'],
                status: null,
              },
            },
          },
          id: 'QXBwOg==',
        },
      },
    });
  });

  it('should return task type list', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        query: `
          query useTaskTypeListQuery(
          $count: Int!
          $after: String
          ) {
            app {
              taskTypeList {
              ...useTaskTypePagination
                id
              }
              id
            }
          }
          
          fragment useTaskTypePagination on TaskTypeListType {
            id
            list(first: $count, after: $after) {
              edges {
                node {
                  id
                  order
                ...useTaskTypeFragment
                  __typename
                }
                cursor
              }
              pageInfo {
                endCursor
                hasNextPage
              }
            }
          }
          
          fragment useTaskTypeFragment on TaskTypeType {
            id
            typeId
            label
            description
          }
        `,
        variables: {
          after: null,
          count: 5,
        },
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          taskTypeList: {
            id: 'VGFza1R5cGVMaXN0Og==',
            list: {
              edges: [
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                  node: {
                    __typename: 'TaskTypeType',
                    description: 'string',
                    id: 'VGFza1R5cGVUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODJjMQ==',
                    label: 'string',
                    order: 1,
                    typeId: 'EVENT',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjE=',
                  node: {
                    __typename: 'TaskTypeType',
                    description: 'string',
                    id: 'VGFza1R5cGVUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODJjMg==',
                    label: 'string',
                    order: 2,
                    typeId: 'GOAL',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjI=',
                  node: {
                    __typename: 'TaskTypeType',
                    description: 'string',
                    id: 'VGFza1R5cGVUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODJjMw==',
                    label: 'string',
                    order: 3,
                    typeId: 'MEETING',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjM=',
                  node: {
                    __typename: 'TaskTypeType',
                    description: 'string',
                    id: 'VGFza1R5cGVUeXBlOjVkOTRjYjQwZGFiNjJiNWFlZWM0ODFjNA==',
                    label: 'string',
                    order: 4,
                    typeId: 'ROUTINE',
                  },
                },
                {
                  cursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                  node: {
                    __typename: 'TaskTypeType',
                    description: 'string',
                    id: 'VGFza1R5cGVUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODJjNQ==',
                    label: 'string',
                    order: 5,
                    typeId: 'TODO',
                  },
                },
              ],
              pageInfo: {
                endCursor: 'YXJyYXljb25uZWN0aW9uOjQ=',
                hasNextPage: false,
              },
            },
          },
        },
      },
    });
  });

  it('should return settings', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        query: `
          query SettingsQuery(
            $count: Int!
            $after: String
            ) {
              app {
                settings {
                  id
                ...SettingsFragment_data
                }
                id
              }
            }
            
            fragment SettingsFragment_data on SettingsType {
              id
              ownerId
              notifications {
                id
                general {
                ...NotificationsGeneralFragment_data
                }
                types {
                ...NotificationsTypesFragment_data
                }
              ...SubscriptionsPagination_data
              }
            }
            
            fragment NotificationsGeneralFragment_data on NotificationsGeneralSettingType {
              show
              vibrate
            }
            
            fragment NotificationsTypesFragment_data on NotificationsTypesSettingType {
              events
              goals
              meetings
              routines
              todos
            }
            
            fragment SubscriptionsPagination_data on NotificationsType {
              subscriptions(first: $count, after: $after) {
                edges {
                  node {
                    id
                  ...SubscriptionFragment_data
                    __typename
                  }
                  cursor
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
            
            fragment SubscriptionFragment_data on SubscriptionType {
              id
              userAgent
              userDeviceType
            }
        `,
        variables: {
          after: null,
          count: 5,
        },
      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          settings: {
            id: 'U2V0dGluZ3NUeXBlOjVkOTRjYjQwZDRiNjJiNWFlZWM0ODFjNg==',
            notifications: {
              general: {
                show: true,
                vibrate: true,
              },
              id: 'Tm90aWZpY2F0aW9uc1R5cGU6',
              subscriptions: {
                edges: [
                  {
                    cursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                    node: {
                      __typename: 'SubscriptionType',
                      id:
                        'U3Vic2NyaXB0aW9uVHlwZTo1ZDk0Y2I0MGQ0YjYyYjVhZWVjNDgxYzU=',
                      userAgent: 'userAgent',
                      userDeviceType: 'userDeviceType',
                    },
                  },
                ],
                pageInfo: {
                  endCursor: 'YXJyYXljb25uZWN0aW9uOjA=',
                  hasNextPage: false,
                },
              },
              types: {
                events: true,
                goals: true,
                meetings: true,
                routines: true,
                todos: true,
              },
            },
            ownerId: '1234567890',
          },
        },
      },
    });
  });

  it('should return empty todo task', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        variables: {
          id: '',
          type: 'TODO',
        },
        query: `
          query useTaskQuery(
            $id: ID
            $type: String
          ) {
            app {
              task(id: $id, type: $type) {
                id
                ...useTaskFragment
              }
              taskList {
                id
              }
              id
            }
          }
          
          fragment useTaskFragment on TaskType {
            id
            fields {
              __typename
              ... on ChoiceFieldType {
                fieldId
                fieldType
                order
              }
              ... on SwitchFieldType {
                fieldId
                fieldType
                order
              }
              ... on SliderFieldType {
                fieldId
                fieldType
                order
              }
              ... on NestedFieldType {
                fieldId
                fieldType
                order
              }
              ... on TextFieldType {
                fieldId
                fieldType
                order
              }
              ...SliderFieldFragment_data
              ...SwitchFieldFragment_data
              ...ChoiceFieldFragment_data
              ...TextFieldFragment_data
              ...NestedFieldFragment_data
              ... on Node {
                id
              }
            }
          }
          
          fragment SliderFieldFragment_data on SliderFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
              max
              min
              step
            }
            value {
              progress
            }
          }
          
          fragment SwitchFieldFragment_data on SwitchFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
            }
            value {
              enabled
            }
          }
          
          fragment ChoiceFieldFragment_data on ChoiceFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              defaultValue
              options {
                text
                value
              }
              required
            }
            value {
              id
            }
          }
          
          fragment TextFieldFragment_data on TextFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              inputType
              min
              max
              maxLength
              minLength
              required
            }
            value {
              text
            }
          }
          
          fragment NestedFieldFragment_data on NestedFieldType {
            id
            fieldId
            meta {
              fieldType
              parentValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              ownMeta {
                __typename
                ... on ChoiceMetaType {
                  fieldType
                  helperText
                  label
                  defaultValue
                  options {
                    text
                    value
                  }
                  required
                }
                ... on TextMetaType {
                  fieldType
                  helperText
                  label
                  inputType
                  min
                  max
                  maxLength
                  minLength
                  required
                }
                ... on SwitchMetaType {
                  fieldType
                  label
                  disabled
                  required
                }
              }
              childrenMeta {
                fieldType
                parentValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                ownMeta {
                  __typename
                  ... on ChoiceMetaType {
                    fieldType
                    helperText
                    label
                    defaultValue
                    options {
                      text
                      value
                    }
                    required
                  }
                  ... on TextMetaType {
                    fieldType
                    helperText
                    label
                    inputType
                    min
                    max
                    maxLength
                    minLength
                    required
                  }
                  ... on SwitchMetaType {
                    fieldType
                    label
                    disabled
                    required
                  }
                  ... on NestedMetaType {
                    parentValue {
                      __typename
                      ... on SwitchValueType {
                        enabled
                      }
                      ... on TextValueType {
                        text
                      }
                      ... on ChoiceValueType {
                        id
                      }
                    }
                    ownMeta {
                      __typename
                      ... on ChoiceMetaType {
                        fieldType
                        helperText
                        label
                        defaultValue
                        options {
                          text
                          value
                        }
                        required
                      }
                      ... on TextMetaType {
                        fieldType
                        helperText
                        label
                        inputType
                        min
                        max
                        maxLength
                        minLength
                        required
                      }
                      ... on SwitchMetaType {
                        fieldType
                        label
                        disabled
                        required
                      }
                    }
                    childrenMeta {
                      fieldType
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                    }
                  }
                }
                childrenMeta {
                  fieldType
                  parentValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                  ownMeta {
                    __typename
                    ... on ChoiceMetaType {
                      fieldType
                      helperText
                      label
                      defaultValue
                      options {
                        text
                        value
                      }
                      required
                    }
                    ... on TextMetaType {
                      fieldType
                      helperText
                      label
                      inputType
                      min
                      max
                      maxLength
                      minLength
                      required
                    }
                    ... on SwitchMetaType {
                      fieldType
                      label
                      disabled
                      required
                    }
                    ... on NestedMetaType {
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                      childrenMeta {
                        fieldType
                        parentValue {
                          __typename
                          ... on SwitchValueType {
                            enabled
                          }
                          ... on TextValueType {
                            text
                          }
                          ... on ChoiceValueType {
                            id
                          }
                        }
                        ownMeta {
                          __typename
                          ... on ChoiceMetaType {
                            fieldType
                            helperText
                            label
                            defaultValue
                            options {
                              text
                              value
                            }
                            required
                          }
                          ... on TextMetaType {
                            fieldType
                            helperText
                            label
                            inputType
                            min
                            max
                            maxLength
                            minLength
                            required
                          }
                          ... on SwitchMetaType {
                            fieldType
                            label
                            disabled
                            required
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            value {
              ownValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              childrenValue {
                ownValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                childrenValue {
                  ownValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .set('Accept', 'application/json');

    // TODO jak zamockować id podczas tworzenia nowego modelu?
    response.body.data.app.task.id = 'mocked id';
    response.body.data.app.task.fields.forEach(
      (field: any) => (field.id = 'mocked id'),
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          task: {
            fields: [
              {
                __typename: 'TextFieldType',
                fieldId: 'TITLE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Title',
                  inputType: 'text',
                  label: 'Title',
                  max: null,
                  maxLength: 400,
                  min: null,
                  minLength: 0,
                  required: true,
                },
                order: 1,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'SwitchFieldType',
                fieldId: 'PRIORITY',
                fieldType: 'SWITCH',
                id: 'mocked id',
                meta: {
                  disabled: false,
                  fieldType: 'SWITCH',
                  label: 'Important',
                  required: true,
                },
                order: 0,
                value: {
                  enabled: false,
                },
              },
              {
                __typename: 'ChoiceFieldType',
                fieldId: 'STATUS',
                fieldType: 'CHOICE',
                id: 'mocked id',
                meta: {
                  defaultValue: null,
                  fieldType: 'CHOICE',
                  helperText: 'Informacje o testowym polu Status',
                  label: 'Status',
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
                  required: true,
                },
                order: 0,
                value: {
                  id: 'TODO',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'NOTE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Description',
                  inputType: 'text',
                  label: 'Note',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 2,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'NestedFieldType',
                fieldId: 'NOTIFICATIONS',
                fieldType: 'NESTED',
                id: 'mocked id',
                meta: {
                  childrenMeta: [
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'TextMetaType',
                        fieldType: 'TEXT',
                        helperText: 'Additional note helperText',
                        inputType: null,
                        label: 'Additional note',
                        max: null,
                        maxLength: null,
                        min: null,
                        minLength: null,
                        required: true,
                      },
                      parentValue: {
                        __typename: 'SwitchValueType',
                        enabled: true,
                      },
                    },
                  ],
                  fieldType: 'NESTED',
                  ownMeta: {
                    __typename: 'SwitchMetaType',
                    disabled: false,
                    fieldType: 'SWITCH',
                    label: 'Notifications',
                    required: true,
                  },
                  parentValue: null,
                },
                order: 8,
                value: {
                  childrenValue: null,
                  ownValue: null,
                },
              },
            ],
            id: 'mocked id',
          },
          taskList: {
            id: 'VGFza0xpc3Q6',
          },
        },
      },
    });
  });

  it('should return empty goal task', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        variables: {
          id: '',
          type: 'GOAL',
        },
        query: `
          query useTaskQuery(
            $id: ID
            $type: String
          ) {
            app {
              task(id: $id, type: $type) {
                id
                ...useTaskFragment
              }
              taskList {
                id
              }
              id
            }
          }
          
          fragment useTaskFragment on TaskType {
            id
            fields {
              __typename
              ... on ChoiceFieldType {
                fieldId
                fieldType
                order
              }
              ... on SwitchFieldType {
                fieldId
                fieldType
                order
              }
              ... on SliderFieldType {
                fieldId
                fieldType
                order
              }
              ... on NestedFieldType {
                fieldId
                fieldType
                order
              }
              ... on TextFieldType {
                fieldId
                fieldType
                order
              }
              ...SliderFieldFragment_data
              ...SwitchFieldFragment_data
              ...ChoiceFieldFragment_data
              ...TextFieldFragment_data
              ...NestedFieldFragment_data
              ... on Node {
                id
              }
            }
          }
          
          fragment SliderFieldFragment_data on SliderFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
              max
              min
              step
            }
            value {
              progress
            }
          }
          
          fragment SwitchFieldFragment_data on SwitchFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
            }
            value {
              enabled
            }
          }
          
          fragment ChoiceFieldFragment_data on ChoiceFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              defaultValue
              options {
                text
                value
              }
              required
            }
            value {
              id
            }
          }
          
          fragment TextFieldFragment_data on TextFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              inputType
              min
              max
              maxLength
              minLength
              required
            }
            value {
              text
            }
          }
          
          fragment NestedFieldFragment_data on NestedFieldType {
            id
            fieldId
            meta {
              fieldType
              parentValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              ownMeta {
                __typename
                ... on ChoiceMetaType {
                  fieldType
                  helperText
                  label
                  defaultValue
                  options {
                    text
                    value
                  }
                  required
                }
                ... on TextMetaType {
                  fieldType
                  helperText
                  label
                  inputType
                  min
                  max
                  maxLength
                  minLength
                  required
                }
                ... on SwitchMetaType {
                  fieldType
                  label
                  disabled
                  required
                }
              }
              childrenMeta {
                fieldType
                parentValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                ownMeta {
                  __typename
                  ... on ChoiceMetaType {
                    fieldType
                    helperText
                    label
                    defaultValue
                    options {
                      text
                      value
                    }
                    required
                  }
                  ... on TextMetaType {
                    fieldType
                    helperText
                    label
                    inputType
                    min
                    max
                    maxLength
                    minLength
                    required
                  }
                  ... on SwitchMetaType {
                    fieldType
                    label
                    disabled
                    required
                  }
                  ... on NestedMetaType {
                    parentValue {
                      __typename
                      ... on SwitchValueType {
                        enabled
                      }
                      ... on TextValueType {
                        text
                      }
                      ... on ChoiceValueType {
                        id
                      }
                    }
                    ownMeta {
                      __typename
                      ... on ChoiceMetaType {
                        fieldType
                        helperText
                        label
                        defaultValue
                        options {
                          text
                          value
                        }
                        required
                      }
                      ... on TextMetaType {
                        fieldType
                        helperText
                        label
                        inputType
                        min
                        max
                        maxLength
                        minLength
                        required
                      }
                      ... on SwitchMetaType {
                        fieldType
                        label
                        disabled
                        required
                      }
                    }
                    childrenMeta {
                      fieldType
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                    }
                  }
                }
                childrenMeta {
                  fieldType
                  parentValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                  ownMeta {
                    __typename
                    ... on ChoiceMetaType {
                      fieldType
                      helperText
                      label
                      defaultValue
                      options {
                        text
                        value
                      }
                      required
                    }
                    ... on TextMetaType {
                      fieldType
                      helperText
                      label
                      inputType
                      min
                      max
                      maxLength
                      minLength
                      required
                    }
                    ... on SwitchMetaType {
                      fieldType
                      label
                      disabled
                      required
                    }
                    ... on NestedMetaType {
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                      childrenMeta {
                        fieldType
                        parentValue {
                          __typename
                          ... on SwitchValueType {
                            enabled
                          }
                          ... on TextValueType {
                            text
                          }
                          ... on ChoiceValueType {
                            id
                          }
                        }
                        ownMeta {
                          __typename
                          ... on ChoiceMetaType {
                            fieldType
                            helperText
                            label
                            defaultValue
                            options {
                              text
                              value
                            }
                            required
                          }
                          ... on TextMetaType {
                            fieldType
                            helperText
                            label
                            inputType
                            min
                            max
                            maxLength
                            minLength
                            required
                          }
                          ... on SwitchMetaType {
                            fieldType
                            label
                            disabled
                            required
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            value {
              ownValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              childrenValue {
                ownValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                childrenValue {
                  ownValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .set('Accept', 'application/json');

    // TODO jak zamockować id podczas tworzenia nowego modelu?
    response.body.data.app.task.id = 'mocked id';
    response.body.data.app.task.fields.forEach(
      (field: any) => (field.id = 'mocked id'),
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          task: {
            fields: [
              {
                __typename: 'TextFieldType',
                fieldId: 'TITLE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Title',
                  inputType: 'text',
                  label: 'Title',
                  max: null,
                  maxLength: 400,
                  min: null,
                  minLength: 0,
                  required: true,
                },
                order: 1,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'SwitchFieldType',
                fieldId: 'PRIORITY',
                fieldType: 'SWITCH',
                id: 'mocked id',
                meta: {
                  disabled: false,
                  fieldType: 'SWITCH',
                  label: 'Important',
                  required: true,
                },
                order: 0,
                value: {
                  enabled: false,
                },
              },
              {
                __typename: 'ChoiceFieldType',
                fieldId: 'STATUS',
                fieldType: 'CHOICE',
                id: 'mocked id',
                meta: {
                  defaultValue: null,
                  fieldType: 'CHOICE',
                  helperText: 'Informacje o testowym polu Status',
                  label: 'Status',
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
                  required: true,
                },
                order: 0,
                value: {
                  id: 'TODO',
                },
              },
              {
                __typename: 'SliderFieldType',
                fieldId: 'PROGRESS',
                fieldType: 'SLIDER',
                id: 'mocked id',
                meta: {
                  disabled: false,
                  fieldType: 'SLIDER',
                  label: 'Progress',
                  max: 100,
                  min: 0,
                  required: false,
                  step: 1,
                },
                order: 5,
                value: {
                  progress: 0,
                },
              },
              {
                __typename: 'NestedFieldType',
                fieldId: 'NOTIFICATIONS',
                fieldType: 'NESTED',
                id: 'mocked id',
                meta: {
                  childrenMeta: [
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'TextMetaType',
                        fieldType: 'TEXT',
                        helperText: 'Additional note helperText',
                        inputType: null,
                        label: 'Additional note',
                        max: null,
                        maxLength: null,
                        min: null,
                        minLength: null,
                        required: true,
                      },
                      parentValue: {
                        __typename: 'SwitchValueType',
                        enabled: true,
                      },
                    },
                  ],
                  fieldType: 'NESTED',
                  ownMeta: {
                    __typename: 'SwitchMetaType',
                    disabled: false,
                    fieldType: 'SWITCH',
                    label: 'Notifications',
                    required: true,
                  },
                  parentValue: null,
                },
                order: 8,
                value: {
                  childrenValue: null,
                  ownValue: null,
                },
              },
            ],
            id: 'mocked id',
          },
          taskList: {
            id: 'VGFza0xpc3Q6',
          },
        },
      },
    });
  });

  it('should return empty event task', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        variables: {
          id: '',
          type: 'EVENT',
        },
        query: `
          query useTaskQuery(
            $id: ID
            $type: String
          ) {
            app {
              task(id: $id, type: $type) {
                id
                ...useTaskFragment
              }
              taskList {
                id
              }
              id
            }
          }
          
          fragment useTaskFragment on TaskType {
            id
            fields {
              __typename
              ... on ChoiceFieldType {
                fieldId
                fieldType
                order
              }
              ... on SwitchFieldType {
                fieldId
                fieldType
                order
              }
              ... on SliderFieldType {
                fieldId
                fieldType
                order
              }
              ... on NestedFieldType {
                fieldId
                fieldType
                order
              }
              ... on TextFieldType {
                fieldId
                fieldType
                order
              }
              ...SliderFieldFragment_data
              ...SwitchFieldFragment_data
              ...ChoiceFieldFragment_data
              ...TextFieldFragment_data
              ...NestedFieldFragment_data
              ... on Node {
                id
              }
            }
          }
          
          fragment SliderFieldFragment_data on SliderFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
              max
              min
              step
            }
            value {
              progress
            }
          }
          
          fragment SwitchFieldFragment_data on SwitchFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
            }
            value {
              enabled
            }
          }
          
          fragment ChoiceFieldFragment_data on ChoiceFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              defaultValue
              options {
                text
                value
              }
              required
            }
            value {
              id
            }
          }
          
          fragment TextFieldFragment_data on TextFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              inputType
              min
              max
              maxLength
              minLength
              required
            }
            value {
              text
            }
          }
          
          fragment NestedFieldFragment_data on NestedFieldType {
            id
            fieldId
            meta {
              fieldType
              parentValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              ownMeta {
                __typename
                ... on ChoiceMetaType {
                  fieldType
                  helperText
                  label
                  defaultValue
                  options {
                    text
                    value
                  }
                  required
                }
                ... on TextMetaType {
                  fieldType
                  helperText
                  label
                  inputType
                  min
                  max
                  maxLength
                  minLength
                  required
                }
                ... on SwitchMetaType {
                  fieldType
                  label
                  disabled
                  required
                }
              }
              childrenMeta {
                fieldType
                parentValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                ownMeta {
                  __typename
                  ... on ChoiceMetaType {
                    fieldType
                    helperText
                    label
                    defaultValue
                    options {
                      text
                      value
                    }
                    required
                  }
                  ... on TextMetaType {
                    fieldType
                    helperText
                    label
                    inputType
                    min
                    max
                    maxLength
                    minLength
                    required
                  }
                  ... on SwitchMetaType {
                    fieldType
                    label
                    disabled
                    required
                  }
                  ... on NestedMetaType {
                    parentValue {
                      __typename
                      ... on SwitchValueType {
                        enabled
                      }
                      ... on TextValueType {
                        text
                      }
                      ... on ChoiceValueType {
                        id
                      }
                    }
                    ownMeta {
                      __typename
                      ... on ChoiceMetaType {
                        fieldType
                        helperText
                        label
                        defaultValue
                        options {
                          text
                          value
                        }
                        required
                      }
                      ... on TextMetaType {
                        fieldType
                        helperText
                        label
                        inputType
                        min
                        max
                        maxLength
                        minLength
                        required
                      }
                      ... on SwitchMetaType {
                        fieldType
                        label
                        disabled
                        required
                      }
                    }
                    childrenMeta {
                      fieldType
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                    }
                  }
                }
                childrenMeta {
                  fieldType
                  parentValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                  ownMeta {
                    __typename
                    ... on ChoiceMetaType {
                      fieldType
                      helperText
                      label
                      defaultValue
                      options {
                        text
                        value
                      }
                      required
                    }
                    ... on TextMetaType {
                      fieldType
                      helperText
                      label
                      inputType
                      min
                      max
                      maxLength
                      minLength
                      required
                    }
                    ... on SwitchMetaType {
                      fieldType
                      label
                      disabled
                      required
                    }
                    ... on NestedMetaType {
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                      childrenMeta {
                        fieldType
                        parentValue {
                          __typename
                          ... on SwitchValueType {
                            enabled
                          }
                          ... on TextValueType {
                            text
                          }
                          ... on ChoiceValueType {
                            id
                          }
                        }
                        ownMeta {
                          __typename
                          ... on ChoiceMetaType {
                            fieldType
                            helperText
                            label
                            defaultValue
                            options {
                              text
                              value
                            }
                            required
                          }
                          ... on TextMetaType {
                            fieldType
                            helperText
                            label
                            inputType
                            min
                            max
                            maxLength
                            minLength
                            required
                          }
                          ... on SwitchMetaType {
                            fieldType
                            label
                            disabled
                            required
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            value {
              ownValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              childrenValue {
                ownValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                childrenValue {
                  ownValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .set('Accept', 'application/json');

    // TODO jak zamockować id podczas tworzenia nowego modelu?
    response.body.data.app.task.id = 'mocked id';
    response.body.data.app.task.fields.forEach(
      (field: any) => (field.id = 'mocked id'),
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          task: {
            id: 'mocked id',
            fields: [
              {
                __typename: 'TextFieldType',
                fieldId: 'TITLE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Title',
                  inputType: 'text',
                  label: 'Title',
                  max: null,
                  maxLength: 400,
                  min: null,
                  minLength: 0,
                  required: true,
                },
                order: 1,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'SwitchFieldType',
                fieldId: 'PRIORITY',
                fieldType: 'SWITCH',
                id: 'mocked id',
                meta: {
                  disabled: false,
                  fieldType: 'SWITCH',
                  label: 'Important',
                  required: true,
                },
                order: 0,
                value: {
                  enabled: false,
                },
              },
              {
                __typename: 'ChoiceFieldType',
                fieldId: 'STATUS',
                fieldType: 'CHOICE',
                id: 'mocked id',
                meta: {
                  defaultValue: null,
                  fieldType: 'CHOICE',
                  helperText: 'Informacje o testowym polu Status',
                  label: 'Status',
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
                  required: true,
                },
                order: 0,
                value: {
                  id: 'TODO',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'NOTE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Description',
                  inputType: 'text',
                  label: 'Note',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 2,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'LOCATION',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Location',
                  inputType: 'text',
                  label: 'Location',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 3,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'DATE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Date',
                  inputType: 'date-local',
                  label: 'Date',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 4,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'DURATION',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Duration',
                  inputType: 'text',
                  label: 'Duration',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 0,
                  required: false,
                },
                order: 3,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'NestedFieldType',
                fieldId: 'NOTIFICATIONS',
                fieldType: 'NESTED',
                id: 'mocked id',
                meta: {
                  childrenMeta: [
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'TextMetaType',
                        fieldType: 'TEXT',
                        helperText: 'Additional note helperText',
                        inputType: null,
                        label: 'Additional note',
                        max: null,
                        maxLength: null,
                        min: null,
                        minLength: null,
                        required: true,
                      },
                      parentValue: {
                        __typename: 'SwitchValueType',
                        enabled: true,
                      },
                    },
                  ],
                  fieldType: 'NESTED',
                  ownMeta: {
                    __typename: 'SwitchMetaType',
                    disabled: false,
                    fieldType: 'SWITCH',
                    label: 'Notifications',
                    required: true,
                  },
                  parentValue: null,
                },
                order: 8,
                value: {
                  childrenValue: null,
                  ownValue: null,
                },
              },
            ],
          },
          taskList: {
            id: 'VGFza0xpc3Q6',
          },
        },
      },
    });
  });

  it('should return empty meeting task', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        variables: {
          id: '',
          type: 'MEETING',
        },
        query: `
          query useTaskQuery(
            $id: ID
            $type: String
          ) {
            app {
              task(id: $id, type: $type) {
                id
                ...useTaskFragment
              }
              taskList {
                id
              }
              id
            }
          }
          
          fragment useTaskFragment on TaskType {
            id
            fields {
              __typename
              ... on ChoiceFieldType {
                fieldId
                fieldType
                order
              }
              ... on SwitchFieldType {
                fieldId
                fieldType
                order
              }
              ... on SliderFieldType {
                fieldId
                fieldType
                order
              }
              ... on NestedFieldType {
                fieldId
                fieldType
                order
              }
              ... on TextFieldType {
                fieldId
                fieldType
                order
              }
              ...SliderFieldFragment_data
              ...SwitchFieldFragment_data
              ...ChoiceFieldFragment_data
              ...TextFieldFragment_data
              ...NestedFieldFragment_data
              ... on Node {
                id
              }
            }
          }
          
          fragment SliderFieldFragment_data on SliderFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
              max
              min
              step
            }
            value {
              progress
            }
          }
          
          fragment SwitchFieldFragment_data on SwitchFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
            }
            value {
              enabled
            }
          }
          
          fragment ChoiceFieldFragment_data on ChoiceFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              defaultValue
              options {
                text
                value
              }
              required
            }
            value {
              id
            }
          }
          
          fragment TextFieldFragment_data on TextFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              inputType
              min
              max
              maxLength
              minLength
              required
            }
            value {
              text
            }
          }
          
          fragment NestedFieldFragment_data on NestedFieldType {
            id
            fieldId
            meta {
              fieldType
              parentValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              ownMeta {
                __typename
                ... on ChoiceMetaType {
                  fieldType
                  helperText
                  label
                  defaultValue
                  options {
                    text
                    value
                  }
                  required
                }
                ... on TextMetaType {
                  fieldType
                  helperText
                  label
                  inputType
                  min
                  max
                  maxLength
                  minLength
                  required
                }
                ... on SwitchMetaType {
                  fieldType
                  label
                  disabled
                  required
                }
              }
              childrenMeta {
                fieldType
                parentValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                ownMeta {
                  __typename
                  ... on ChoiceMetaType {
                    fieldType
                    helperText
                    label
                    defaultValue
                    options {
                      text
                      value
                    }
                    required
                  }
                  ... on TextMetaType {
                    fieldType
                    helperText
                    label
                    inputType
                    min
                    max
                    maxLength
                    minLength
                    required
                  }
                  ... on SwitchMetaType {
                    fieldType
                    label
                    disabled
                    required
                  }
                  ... on NestedMetaType {
                    parentValue {
                      __typename
                      ... on SwitchValueType {
                        enabled
                      }
                      ... on TextValueType {
                        text
                      }
                      ... on ChoiceValueType {
                        id
                      }
                    }
                    ownMeta {
                      __typename
                      ... on ChoiceMetaType {
                        fieldType
                        helperText
                        label
                        defaultValue
                        options {
                          text
                          value
                        }
                        required
                      }
                      ... on TextMetaType {
                        fieldType
                        helperText
                        label
                        inputType
                        min
                        max
                        maxLength
                        minLength
                        required
                      }
                      ... on SwitchMetaType {
                        fieldType
                        label
                        disabled
                        required
                      }
                    }
                    childrenMeta {
                      fieldType
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                    }
                  }
                }
                childrenMeta {
                  fieldType
                  parentValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                  ownMeta {
                    __typename
                    ... on ChoiceMetaType {
                      fieldType
                      helperText
                      label
                      defaultValue
                      options {
                        text
                        value
                      }
                      required
                    }
                    ... on TextMetaType {
                      fieldType
                      helperText
                      label
                      inputType
                      min
                      max
                      maxLength
                      minLength
                      required
                    }
                    ... on SwitchMetaType {
                      fieldType
                      label
                      disabled
                      required
                    }
                    ... on NestedMetaType {
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                      childrenMeta {
                        fieldType
                        parentValue {
                          __typename
                          ... on SwitchValueType {
                            enabled
                          }
                          ... on TextValueType {
                            text
                          }
                          ... on ChoiceValueType {
                            id
                          }
                        }
                        ownMeta {
                          __typename
                          ... on ChoiceMetaType {
                            fieldType
                            helperText
                            label
                            defaultValue
                            options {
                              text
                              value
                            }
                            required
                          }
                          ... on TextMetaType {
                            fieldType
                            helperText
                            label
                            inputType
                            min
                            max
                            maxLength
                            minLength
                            required
                          }
                          ... on SwitchMetaType {
                            fieldType
                            label
                            disabled
                            required
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            value {
              ownValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              childrenValue {
                ownValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                childrenValue {
                  ownValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .set('Accept', 'application/json');

    // TODO jak zamockować id podczas tworzenia nowego modelu?
    response.body.data.app.task.id = 'mocked id';
    response.body.data.app.task.fields.forEach(
      (field: any) => (field.id = 'mocked id'),
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          task: {
            id: 'mocked id',
            fields: [
              {
                __typename: 'TextFieldType',
                fieldId: 'TITLE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Title',
                  inputType: 'text',
                  label: 'Title',
                  max: null,
                  maxLength: 400,
                  min: null,
                  minLength: 0,
                  required: true,
                },
                order: 1,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'SwitchFieldType',
                fieldId: 'PRIORITY',
                fieldType: 'SWITCH',
                id: 'mocked id',
                meta: {
                  disabled: false,
                  fieldType: 'SWITCH',
                  label: 'Important',
                  required: true,
                },
                order: 0,
                value: {
                  enabled: false,
                },
              },
              {
                __typename: 'ChoiceFieldType',
                fieldId: 'STATUS',
                fieldType: 'CHOICE',
                id: 'mocked id',
                meta: {
                  defaultValue: null,
                  fieldType: 'CHOICE',
                  helperText: 'Informacje o testowym polu Status',
                  label: 'Status',
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
                  required: true,
                },
                order: 0,
                value: {
                  id: 'TODO',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'NOTE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Description',
                  inputType: 'text',
                  label: 'Note',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 2,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'LOCATION',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Location',
                  inputType: 'text',
                  label: 'Location',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 3,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'DATE_TIME',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Date',
                  inputType: 'datetime-local',
                  label: 'Date',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: false,
                },
                order: 3,
                value: {
                  text: '2019-10-02T16:07:28.857Z',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'DURATION',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Duration',
                  inputType: 'text',
                  label: 'Duration',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 0,
                  required: false,
                },
                order: 3,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'PERSON',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Person helperText',
                  inputType: 'text',
                  label: 'Person',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: true,
                },
                order: 4,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'NestedFieldType',
                fieldId: 'NOTIFICATIONS',
                fieldType: 'NESTED',
                id: 'mocked id',
                meta: {
                  childrenMeta: [
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'TextMetaType',
                        fieldType: 'TEXT',
                        helperText: 'Additional note helperText',
                        inputType: null,
                        label: 'Additional note',
                        max: null,
                        maxLength: null,
                        min: null,
                        minLength: null,
                        required: true,
                      },
                      parentValue: {
                        __typename: 'SwitchValueType',
                        enabled: true,
                      },
                    },
                  ],
                  fieldType: 'NESTED',
                  ownMeta: {
                    __typename: 'SwitchMetaType',
                    disabled: false,
                    fieldType: 'SWITCH',
                    label: 'Notifications',
                    required: true,
                  },
                  parentValue: null,
                },
                order: 8,
                value: {
                  childrenValue: null,
                  ownValue: null,
                },
              },
            ],
          },
          taskList: {
            id: 'VGFza0xpc3Q6',
          },
        },
      },
    });
  });

  it('should return empty routine task', async () => {
    const response = await agent(app())
      .post('/graphql')
      .send({
        variables: {
          id: '',
          type: 'ROUTINE',
        },
        query: `
          query useTaskQuery(
            $id: ID
            $type: String
          ) {
            app {
              task(id: $id, type: $type) {
                id
                ...useTaskFragment
              }
              taskList {
                id
              }
              id
            }
          }
          
          fragment useTaskFragment on TaskType {
            id
            fields {
              __typename
              ... on ChoiceFieldType {
                fieldId
                fieldType
                order
              }
              ... on SwitchFieldType {
                fieldId
                fieldType
                order
              }
              ... on SliderFieldType {
                fieldId
                fieldType
                order
              }
              ... on NestedFieldType {
                fieldId
                fieldType
                order
              }
              ... on TextFieldType {
                fieldId
                fieldType
                order
              }
              ...SliderFieldFragment_data
              ...SwitchFieldFragment_data
              ...ChoiceFieldFragment_data
              ...TextFieldFragment_data
              ...NestedFieldFragment_data
              ... on Node {
                id
              }
            }
          }
          
          fragment SliderFieldFragment_data on SliderFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
              max
              min
              step
            }
            value {
              progress
            }
          }
          
          fragment SwitchFieldFragment_data on SwitchFieldType {
            id
            fieldId
            meta {
              fieldType
              label
              disabled
              required
            }
            value {
              enabled
            }
          }
          
          fragment ChoiceFieldFragment_data on ChoiceFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              defaultValue
              options {
                text
                value
              }
              required
            }
            value {
              id
            }
          }
          
          fragment TextFieldFragment_data on TextFieldType {
            id
            fieldId
            meta {
              fieldType
              helperText
              label
              inputType
              min
              max
              maxLength
              minLength
              required
            }
            value {
              text
            }
          }
          
          fragment NestedFieldFragment_data on NestedFieldType {
            id
            fieldId
            meta {
              fieldType
              parentValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              ownMeta {
                __typename
                ... on ChoiceMetaType {
                  fieldType
                  helperText
                  label
                  defaultValue
                  options {
                    text
                    value
                  }
                  required
                }
                ... on TextMetaType {
                  fieldType
                  helperText
                  label
                  inputType
                  min
                  max
                  maxLength
                  minLength
                  required
                }
                ... on SwitchMetaType {
                  fieldType
                  label
                  disabled
                  required
                }
              }
              childrenMeta {
                fieldType
                parentValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                ownMeta {
                  __typename
                  ... on ChoiceMetaType {
                    fieldType
                    helperText
                    label
                    defaultValue
                    options {
                      text
                      value
                    }
                    required
                  }
                  ... on TextMetaType {
                    fieldType
                    helperText
                    label
                    inputType
                    min
                    max
                    maxLength
                    minLength
                    required
                  }
                  ... on SwitchMetaType {
                    fieldType
                    label
                    disabled
                    required
                  }
                  ... on NestedMetaType {
                    parentValue {
                      __typename
                      ... on SwitchValueType {
                        enabled
                      }
                      ... on TextValueType {
                        text
                      }
                      ... on ChoiceValueType {
                        id
                      }
                    }
                    ownMeta {
                      __typename
                      ... on ChoiceMetaType {
                        fieldType
                        helperText
                        label
                        defaultValue
                        options {
                          text
                          value
                        }
                        required
                      }
                      ... on TextMetaType {
                        fieldType
                        helperText
                        label
                        inputType
                        min
                        max
                        maxLength
                        minLength
                        required
                      }
                      ... on SwitchMetaType {
                        fieldType
                        label
                        disabled
                        required
                      }
                    }
                    childrenMeta {
                      fieldType
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                    }
                  }
                }
                childrenMeta {
                  fieldType
                  parentValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                  ownMeta {
                    __typename
                    ... on ChoiceMetaType {
                      fieldType
                      helperText
                      label
                      defaultValue
                      options {
                        text
                        value
                      }
                      required
                    }
                    ... on TextMetaType {
                      fieldType
                      helperText
                      label
                      inputType
                      min
                      max
                      maxLength
                      minLength
                      required
                    }
                    ... on SwitchMetaType {
                      fieldType
                      label
                      disabled
                      required
                    }
                    ... on NestedMetaType {
                      parentValue {
                        __typename
                        ... on SwitchValueType {
                          enabled
                        }
                        ... on TextValueType {
                          text
                        }
                        ... on ChoiceValueType {
                          id
                        }
                      }
                      ownMeta {
                        __typename
                        ... on ChoiceMetaType {
                          fieldType
                          helperText
                          label
                          defaultValue
                          options {
                            text
                            value
                          }
                          required
                        }
                        ... on TextMetaType {
                          fieldType
                          helperText
                          label
                          inputType
                          min
                          max
                          maxLength
                          minLength
                          required
                        }
                        ... on SwitchMetaType {
                          fieldType
                          label
                          disabled
                          required
                        }
                      }
                      childrenMeta {
                        fieldType
                        parentValue {
                          __typename
                          ... on SwitchValueType {
                            enabled
                          }
                          ... on TextValueType {
                            text
                          }
                          ... on ChoiceValueType {
                            id
                          }
                        }
                        ownMeta {
                          __typename
                          ... on ChoiceMetaType {
                            fieldType
                            helperText
                            label
                            defaultValue
                            options {
                              text
                              value
                            }
                            required
                          }
                          ... on TextMetaType {
                            fieldType
                            helperText
                            label
                            inputType
                            min
                            max
                            maxLength
                            minLength
                            required
                          }
                          ... on SwitchMetaType {
                            fieldType
                            label
                            disabled
                            required
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            value {
              ownValue {
                __typename
                ... on SwitchValueType {
                  enabled
                }
                ... on TextValueType {
                  text
                }
                ... on ChoiceValueType {
                  id
                }
              }
              childrenValue {
                ownValue {
                  __typename
                  ... on SwitchValueType {
                    enabled
                  }
                  ... on TextValueType {
                    text
                  }
                  ... on ChoiceValueType {
                    id
                  }
                }
                childrenValue {
                  ownValue {
                    __typename
                    ... on SwitchValueType {
                      enabled
                    }
                    ... on TextValueType {
                      text
                    }
                    ... on ChoiceValueType {
                      id
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .set('Accept', 'application/json');

    // TODO jak zamockować id podczas tworzenia nowego modelu?
    response.body.data.app.task.id = 'mocked id';
    response.body.data.app.task.fields.forEach(
      (field: any) => (field.id = 'mocked id'),
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: {
        app: {
          id: 'QXBwOg==',
          task: {
            id: 'mocked id',
            fields: [
              {
                __typename: 'TextFieldType',
                fieldId: 'TITLE',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText: 'Informacje o testowym polu Title',
                  inputType: 'text',
                  label: 'Title',
                  max: null,
                  maxLength: 400,
                  min: null,
                  minLength: 0,
                  required: true,
                },
                order: 1,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'SwitchFieldType',
                fieldId: 'PRIORITY',
                fieldType: 'SWITCH',
                id: 'mocked id',
                meta: {
                  disabled: false,
                  fieldType: 'SWITCH',
                  label: 'Important',
                  required: true,
                },
                order: 0,
                value: {
                  enabled: false,
                },
              },
              {
                __typename: 'ChoiceFieldType',
                fieldId: 'STATUS',
                fieldType: 'CHOICE',
                id: 'mocked id',
                meta: {
                  defaultValue: null,
                  fieldType: 'CHOICE',
                  helperText: 'Informacje o testowym polu Status',
                  label: 'Status',
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
                  required: true,
                },
                order: 0,
                value: {
                  id: 'TODO',
                },
              },
              {
                __typename: 'NestedFieldType',
                fieldId: 'CYCLE',
                fieldType: 'NESTED',
                id: 'mocked id',
                meta: {
                  childrenMeta: [
                    {
                      childrenMeta: [
                        {
                          fieldType: 'NESTED',
                          ownMeta: {
                            __typename: 'TextMetaType',
                            fieldType: 'TEXT',
                            helperText: 'Minutes time cycle helperText',
                            inputType: 'number',
                            label: 'Minutes time cycle',
                            max: null,
                            maxLength: null,
                            min: null,
                            minLength: null,
                            required: true,
                          },
                          parentValue: {
                            __typename: 'ChoiceValueType',
                            id: 'MINUTES',
                          },
                        },
                      ],
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'ChoiceMetaType',
                        defaultValue: null,
                        fieldType: 'CHOICE',
                        helperText: 'Time cycle helperText',
                        label: 'Time cycle',
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
                        required: true,
                      },
                      parentValue: {
                        __typename: 'ChoiceValueType',
                        id: 'TIME_CYCLE',
                      },
                    },
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'ChoiceMetaType',
                        defaultValue: null,
                        fieldType: 'CHOICE',
                        helperText: 'Day cycle helperText',
                        label: 'Day cycle',
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
                        required: true,
                      },
                      parentValue: {
                        __typename: 'ChoiceValueType',
                        id: 'DAY_CYCLE',
                      },
                    },
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'ChoiceMetaType',
                        defaultValue: null,
                        fieldType: 'CHOICE',
                        helperText: 'Week cycle helperText',
                        label: 'Week cycle',
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
                        required: true,
                      },
                      parentValue: {
                        __typename: 'ChoiceValueType',
                        id: 'WEEK_CYCLE',
                      },
                    },
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'ChoiceMetaType',
                        defaultValue: null,
                        fieldType: 'CHOICE',
                        helperText: 'Month cycle helperText',
                        label: 'Month cycle',
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
                        required: true,
                      },
                      parentValue: {
                        __typename: 'ChoiceValueType',
                        id: 'MONTH_CYCLE',
                      },
                    },
                  ],
                  fieldType: 'NESTED',
                  ownMeta: {
                    __typename: 'ChoiceMetaType',
                    defaultValue: null,
                    fieldType: 'CHOICE',
                    helperText: 'Cycle helperText',
                    label: 'Cycle',
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
                    required: true,
                  },
                  parentValue: null,
                },
                order: 5,
                value: {
                  childrenValue: null,
                  ownValue: null,
                },
              },
              {
                __typename: 'TextFieldType',
                fieldId: 'ACTION',
                fieldType: 'TEXT',
                id: 'mocked id',
                meta: {
                  fieldType: 'TEXT',
                  helperText:
                    'Określ jaka akcja ma nastąpić podczas każdego cyklu',
                  inputType: 'text',
                  label: 'Action',
                  max: null,
                  maxLength: 100,
                  min: null,
                  minLength: 3,
                  required: true,
                },
                order: 6,
                value: {
                  text: '',
                },
              },
              {
                __typename: 'NestedFieldType',
                fieldId: 'NOTIFICATIONS',
                fieldType: 'NESTED',
                id: 'mocked id',
                meta: {
                  childrenMeta: [
                    {
                      childrenMeta: null,
                      fieldType: 'NESTED',
                      ownMeta: {
                        __typename: 'TextMetaType',
                        fieldType: 'TEXT',
                        helperText: 'Additional note helperText',
                        inputType: null,
                        label: 'Additional note',
                        max: null,
                        maxLength: null,
                        min: null,
                        minLength: null,
                        required: true,
                      },
                      parentValue: {
                        __typename: 'SwitchValueType',
                        enabled: true,
                      },
                    },
                  ],
                  fieldType: 'NESTED',
                  ownMeta: {
                    __typename: 'SwitchMetaType',
                    disabled: false,
                    fieldType: 'SWITCH',
                    label: 'Notifications',
                    required: true,
                  },
                  parentValue: null,
                },
                order: 8,
                value: {
                  childrenValue: null,
                  ownValue: null,
                },
              },
            ],
          },
          taskList: {
            id: 'VGFza0xpc3Q6',
          },
        },
      },
    });
  });
});
