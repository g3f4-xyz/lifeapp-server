import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
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
      resolve: async (_, { id, type }, { user: { id: ownerId }}): Promise<ITask> => {
        console.log(['resolve.task{ id, type }'], { id, type })
        if (id && id.length > 0) {
          return await getTask(fromGlobalId(id).id);
        }

        return await getEmptyTask(type, ownerId);
      },
    },
    taskList: {
      type: new GraphQLNonNull(TaskListType),
      resolve: (): boolean => true,
    },
    taskTypeList: {
      type: new GraphQLNonNull(TaskTypeListType),
      resolve: (): boolean => true,
    },
  }),
});
