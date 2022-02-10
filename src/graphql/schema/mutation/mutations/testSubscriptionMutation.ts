import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

export const testSubscriptionMutation = mutationWithClientMutationId({
  name: 'TestSubscription',
  inputFields: {
    subscriptionId: { type: GraphQLID },
  },
  outputFields: {
    statusCode: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async () => {
    try {
      // #TODO
    } catch (error) {
      return error;
    }
  },
});
