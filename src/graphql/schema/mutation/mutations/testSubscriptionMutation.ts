import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

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
  mutateAndGetPayload: async (
    { subscriptionId },
    { notificationsService }: Context,
  ) => {
    try {
      const { id: subscriptionModelId } = await fromGlobalId(subscriptionId);

      const statusCode = await notificationsService.testSubscription(
        subscriptionModelId,
      );

      return { statusCode };
    } catch (error) {
      return error;
    }
  },
});
