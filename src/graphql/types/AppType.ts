import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import { fromGlobalId, globalIdField } from 'graphql-relay';
import { getEmptyTask, getSettings, getTask } from '../../db/api';
import { IContext, ISettings, ITask } from '../../db/interfaces';
import { SettingsType } from './SettingsType';
import { TaskListType } from './TaskListType';
import { TaskType } from './TaskType';
import { TaskTypeListType } from './TaskTypeListType';

export const AppType = new GraphQLObjectType<boolean, IContext>({
  name: 'AppType',
  description: 'Application entry point',
  fields: () => ({
    id: globalIdField('App'),
    settings: {
      type: SettingsType,
      resolve: async (_, __, { user: { id: ownerId } }): Promise<ISettings> => await getSettings(ownerId),
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
      resolve: async (_, { id, type }): Promise<ITask> => {
        if (id.length > 0) {
          return await getTask(fromGlobalId(id).id);
        }

        return await getEmptyTask(type);
      },
    },
    taskList: {
      type: TaskListType,
      resolve: (): boolean => true,
    },
    taskTypeList: {
      type: TaskTypeListType,
      resolve: (): boolean => true,
    },
  }),
});
