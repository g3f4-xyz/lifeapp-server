import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const deleteSubscriptionMutation = mutationWithClientMutationId({
  name: 'deleteSubscriptionMutation',
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
    { user, settingsService }: Context,
  ) => {
    try {
      const { id: ownerId } = user;
      const { id } = await fromGlobalId(subscriptionId);

      await settingsService.deleteUserSubscription(ownerId, id);

      return { subscriptionId };
    } catch (error) {
      return error;
    }
  },
});
