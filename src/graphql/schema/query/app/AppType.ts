import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { fromGlobalId, globalIdField } from 'graphql-relay';
import { Context, Settings, Task } from '../../../../db/interfaces';
import { SettingsType } from './settings/SettingsType';
import { TaskListType } from './task-list/TaskListType';
import { TaskTypeListType } from './task-type-list/TaskTypeListType';
import { TaskType } from './task/TaskType';

export const AppType = new GraphQLObjectType<boolean, Context>({
  name: 'AppType',
  description: 'Application entry point',
  fields: () => ({
    id: globalIdField('App'),
    settings: {
      type: new GraphQLNonNull(SettingsType),
      async resolve(
        _,
        __,
        { user: { id: ownerId }, settingsService },
      ): Promise<Settings> {
        return await settingsService.getUserSettings(ownerId);
      },
    },
    task: {
      type: TaskType,
      args: {
        id: {
          type: GraphQLID,
        },
        type: {
          type: GraphQLString,
        },
      },
      resolve: async (
        _,
        { id, type },
        { user: { id: ownerId }, taskService },
      ): Promise<Task> => {
        if (id && id.length > 0) {
          return await taskService.getTask(fromGlobalId(id).id);
        }

        return await taskService.getEmptyTask(ownerId, type);
      },
    },
    taskList: {
      type: new GraphQLNonNull(TaskListType),
      async resolve(_rootValue, _args, { user: { id }, taskService }) {
        return await taskService.getTaskList(id);
      },
    },
    taskTypeList: {
      type: new GraphQLNonNull(TaskTypeListType),
      async resolve(_rootValue, _args, { taskTypeService }) {
        return await taskTypeService.getTaskTypeList();
      },
    },
  }),
});
