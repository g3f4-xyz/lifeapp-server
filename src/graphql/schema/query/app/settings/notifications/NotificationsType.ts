import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NotificationsGeneralSettingType } from './NotificationsGeneralSettingType';
import { SubscriptionType } from './SubscriptionType';

export const NotificationsType = new GraphQLObjectType({
  name: 'NotificationsSettings',
  fields: () => ({
    id: globalIdField('NotificationsSettings', () => 'NotificationsSettings'),
    types: {
      type: new GraphQLNonNull(
        new GraphQLList(
          new GraphQLNonNull(
            new GraphQLObjectType({
              name: 'NotificationsSettingsTaskTypes',
              fields: () => ({
                enabled: {
                  type: new GraphQLNonNull(GraphQLBoolean),
                },
                taskTypeId: {
                  type: new GraphQLNonNull(GraphQLString),
                },
              }),
            }),
          ),
        ),
      ),
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
