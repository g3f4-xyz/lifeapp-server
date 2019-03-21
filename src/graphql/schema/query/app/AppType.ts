import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { fromGlobalId, globalIdField } from 'graphql-relay';
import { getEmptyTask, getSettings, getTask, getTaskList, getTaskTypeList } from '../../../../db/api';
import { IContext, ISettings, ITask } from '../../../../db/interfaces';
import { SettingsType } from './settings/SettingsType';
import { TaskListType } from './task-list/TaskListType';
import { TaskType } from './task/TaskType';
import { TaskTypeListType } from './task-type-list/TaskTypeListType';

export const AppType = new GraphQLObjectType<boolean, IContext>({
  name: 'AppType',
  description: 'Application entry point',
  fields: () => ({
    id: globalIdField('App'),
    settings: {
      type: new GraphQLNonNull(SettingsType),
      async resolve(_, __, { user: { id: ownerId } }): Promise<ISettings> {
        return await getSettings(ownerId);
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
      resolve: async (_, { id, type }, { user: { id: ownerId }}): Promise<ITask> => {
        if (id && id.length > 0) {
          return await getTask(fromGlobalId(id).id);
        }

        return await getEmptyTask(type, ownerId);
      },
    },
    taskList: {
      type: new GraphQLNonNull(TaskListType),
      async resolve(_rootValue, _args, { user: { id } }) {
        return await getTaskList(id);
      },
    },
    taskTypeList: {
      type: new GraphQLNonNull(TaskTypeListType),
      async resolve() {
        return await getTaskTypeList();
      },
    },
  }),
});