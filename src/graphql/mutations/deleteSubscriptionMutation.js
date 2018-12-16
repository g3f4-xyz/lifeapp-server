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
  mutateAndGetPayload: async ({ subscriptionId }) => {
    console.log(['deleteSubscriptionMutation:mutateAndGetPayload'], subscriptionId);
    try {
      const { id } = await fromGlobalId(subscriptionId);

      await deleteSubscription(id);

      return { subscriptionId };
    }

    catch (error) {
      console.error(['deleteSubscriptionMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
