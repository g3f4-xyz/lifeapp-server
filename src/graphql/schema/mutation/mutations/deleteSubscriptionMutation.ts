import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { deleteSubscription } from '../../../../db/api';

export const deleteSubscriptionMutation =  mutationWithClientMutationId({
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
  mutateAndGetPayload: async ({ subscriptionId }, { user }) => {
    try {
      const { id: ownerId } = user;
      const { id } = await fromGlobalId(subscriptionId);

      await deleteSubscription(ownerId, id);

      return { subscriptionId };
    } catch (error) {
      return error;
    }
  },
});
