import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

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
    { settingsService }: Context,
  ) => {
    try {
      const { id } = await fromGlobalId(subscriptionId);

      await settingsService.deleteSubscription(id);

      return { subscriptionId };
    } catch (error) {
      return error;
    }
  },
});
