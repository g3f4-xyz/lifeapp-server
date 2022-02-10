import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

export const SubscriptionType = new GraphQLObjectType({
  name: 'NotificationSubscription',
  fields: () => ({
    id: globalIdField('NotificationSubscription'),
    subscriptionData: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userAgent: {
      type: new GraphQLNonNull(GraphQLString),
    },
    userDeviceType: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
