const { GraphQLString, GraphQLID } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');
const { deleteSubscriptions } = require('../../api');

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
    console.log(['deleteTaskMutation:mutateAndGetPayload'], ownerId);
    try {
      await deleteSubscriptions(ownerId);

      return {
        ownerId: ownerId,
      };
    }

    catch (error) {
      console.error(['deleteTaskMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
