import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { Context, Settings, Task } from '../../../db/interfaces';
import { SettingsType } from './app/settings/SettingsType';
import { TaskListType } from './app/task-list/TaskListType';
import { TaskTypeListType } from './app/task-type-list/TaskTypeListType';
import { TaskType } from './app/task/TaskType';

export const QueryType = new GraphQLObjectType<undefined, Context>({
  name: 'Query',
  fields: () => ({
    settings: {
      type: new GraphQLNonNull(SettingsType),
      async resolve(_, __, { settingsService }): Promise<Settings> {
        return await settingsService.getSettings();
      },
    },
    task: {
      type: new GraphQLNonNull(TaskType),
      args: {
        id: {
          type: GraphQLID,
        },
        typeId: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { id, typeId }, { taskService }): Promise<Task> => {
        if (id && id.length > 0) {
          return await taskService.getTask(fromGlobalId(id).id);
        }

        return await taskService.getEmptyTask(typeId);
      },
    },
    tasks: {
      type: new GraphQLNonNull(TaskListType),
      async resolve(_rootValue, _args, { taskService }) {
        const list = (await taskService.getTaskList()) || [];

        return { list };
      },
    },
    taskTypes: {
      type: new GraphQLNonNull(TaskTypeListType),
      async resolve(_rootValue, _args, { taskTypeService }) {
        const list = await taskTypeService.getTaskTypeList();

        return { list };
      },
    },
  }),
});
