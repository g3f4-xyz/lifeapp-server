import { GraphQLNonNull, GraphQLObjectType, GraphQLList } from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { NotificationsGeneralSettingType } from './NotificationsGeneralSettingType';
import { NotificationsTypesSettingType } from './NotificationsTypesSettingType';
import { SubscriptionType } from './SubscriptionType';

export const NotificationsType = new GraphQLObjectType({
  name: 'NotificationsSettings',
  fields: () => ({
    id: globalIdField('NotificationsSettings'),
    types: {
      type: new GraphQLNonNull(NotificationsTypesSettingType),
    },
    general: {
      type: new GraphQLNonNull(NotificationsGeneralSettingType),
    },
    subscriptions: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(SubscriptionType)),
      ),
    },
  }),
  interfaces: [nodeInterface],
});
