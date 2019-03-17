import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../../nodeDefinitions';

export const SubscriptionType = new GraphQLObjectType({
  name: 'SubscriptionType',
  description: 'subscription type',
  fields: () => ({
    id: globalIdField('SubscriptionType', ({ _id }) => _id),
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
  interfaces: [nodeInterface],
});
