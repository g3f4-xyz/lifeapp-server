import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Context, Settings } from '../../../../../db/interfaces';
import { nodeInterface } from '../../../../nodeDefinitions';
import { NotificationsType } from './notifications/NotificationsType';
import { TaskListSettingsType } from './taskList/TaskListSettingsType';

export const SettingsType = new GraphQLObjectType<Settings, Context>({
  name: 'SettingsType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('SettingsType'),
    ownerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    notifications: {
      type: new GraphQLNonNull(NotificationsType),
    },
    taskList: {
      type: new GraphQLNonNull(TaskListSettingsType),
    },
  }),
  interfaces: [nodeInterface],
});
