const { GraphQLString, GraphQLID } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');
const { deleteSubscriptions } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'deleteSubscriptionsMutation',
  inputFields: {
    ownerId: { type: GraphQLID },
  },
  outputFields: {
    ownerId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ ownerId }) => {
    console.log(['deleteSubscriptionsMutation:mutateAndGetPayload'], ownerId);
    try {
      await deleteSubscriptions(ownerId);

      return {
        ownerId: ownerId,
      };
    }

    catch (error) {
      console.error(['deleteSubscriptionsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
