import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NotificationsGeneralSettingType } from './NotificationsGeneralSettingType';
import { NotificationsTypesSettingType } from './NotificationsTypesSettingType';
import { SubscriptionType } from './SubscriptionType';

export const NotificationsType = new GraphQLObjectType({
  name: 'NotificationsSettings',
  fields: () => ({
    id: globalIdField('NotificationsSettings', () => 'NotificationsSettings'),
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
});
