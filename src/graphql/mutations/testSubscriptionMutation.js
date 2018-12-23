const { GraphQLString, GraphQLID } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const testSubscription = require('../../webPush/testSubscription');

module.exports = mutationWithClientMutationId({
  name: 'testSubscriptionMutation',
  inputFields: {
    subscriptionId: { type: GraphQLID },
  },
  outputFields: {
    statusCode: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ subscriptionId }, { user }) => {
    console.log(['testSubscriptionMutation:mutateAndGetPayload'], subscriptionId);
    try {
      const { id: ownerId } = user;
      const { id: subscriptionModelId } = await fromGlobalId(subscriptionId);

      const statusCode = await testSubscription(ownerId, subscriptionModelId);

      console.log(['testSubscriptionMutation:mutateAndGetPayload:statusCode'], statusCode)

      return { statusCode };
    }

    catch (error) {
      console.error(['testSubscriptionMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
