import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';
import { SubscriptionTypeConnection } from '../../../../../connections';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { NotificationsGeneralSettingType } from './NotificationsGeneralSettingType';
import { NotificationsTypesSettingType } from './NotificationsTypesSettingType';

export const NotificationsType = new GraphQLObjectType({
  name: 'NotificationsType',
  description: 'notifications type',
  fields: () => ({
    id: globalIdField('NotificationsType', ({ _id }) => _id),
    types: {
      type: new GraphQLNonNull(NotificationsTypesSettingType),
    },
    general: {
      type: new GraphQLNonNull(NotificationsGeneralSettingType),
    },
    subscriptions: {
      type: new GraphQLNonNull(SubscriptionTypeConnection),
      description: 'subscriptions connection type',
      args: connectionArgs,
      resolve: ({ subscriptions }, args) =>
        connectionFromArray(subscriptions, args),
    },
  }),
  interfaces: [nodeInterface],
});
