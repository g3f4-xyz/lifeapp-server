import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, ISettings } from '../../../db/interfaces';
import { nodeInterface } from '../../nodeDefinitions';
import { NotificationsType } from './notifications/NotificationsType';
import { TaskListSettingsType } from './taskList/TaskListSettingsType';

export const SettingsType = new GraphQLObjectType<ISettings, IContext>({
  name: 'SettingsType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('SettingsType', ({ _id }) => _id),
    ownerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    notifications: {
      type: new GraphQLNonNull(NotificationsType),
    },
    taskList: {
      type: new GraphQLNonNull(TaskListSettingsType),
      resolve(settings) {
        console.log(['settings.taskList'], settings.taskList)
        return settings.taskList;
      }
    },
  }),
  interfaces: [nodeInterface],
});
