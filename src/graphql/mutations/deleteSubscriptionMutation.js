const { GraphQLString, GraphQLID } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const { deleteSubscription } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'deleteSubscriptionMutation',
  inputFields: {
    subscriptionId: { type: GraphQLID },
  },
  outputFields: {
    subscriptionId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ subscriptionId }, { user }) => {
    console.log(['deleteSubscriptionMutation:mutateAndGetPayload'], subscriptionId);
    try {
      const { id: ownerId } = user;
      const { id } = await fromGlobalId(subscriptionId);

      await deleteSubscription(ownerId, id);

      return { subscriptionId };
    }

    catch (error) {
      console.error(['deleteSubscriptionMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
