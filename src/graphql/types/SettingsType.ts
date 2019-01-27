import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, ISettings } from '../../db/interfaces';
import { nodeInterface } from '../nodeDefinitions';
import { NotificationsType } from './NotificationsType';

export const SettingsType = new GraphQLObjectType<ISettings, IContext>({
  name: 'SettingsType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('SettingsType', ({ _id }) => _id),
    notifications: {
      type: NotificationsType,
    },
    ownerId: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});
