import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

export const deleteSubscriptionMutation = mutationWithClientMutationId({
  name: 'DeleteSubscription',
  inputFields: {
    subscriptionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    subscriptionId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (
    { subscriptionId },
    // { settingsService }: Context,
  ) => {
    try {
      // const { id } = fromGlobalId(subscriptionId);

      // TODO

      return { subscriptionId };
    } catch (error) {
      return error;
    }
  },
});
