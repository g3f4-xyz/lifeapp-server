import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const testSubscriptionMutation = mutationWithClientMutationId({
  name: 'testSubscriptionMutation',
  inputFields: {
    subscriptionId: { type: GraphQLID },
  },
  outputFields: {
    statusCode: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async (
    { subscriptionId },
    { user, notificationsService }: Context,
  ) => {
    try {
      const { id: ownerId } = user;
      const { id: subscriptionModelId } = await fromGlobalId(subscriptionId);

      const statusCode = await notificationsService.testSubscription(
        ownerId,
        subscriptionModelId,
      );

      return { statusCode };
    } catch (error) {
      return error;
    }
  },
});
