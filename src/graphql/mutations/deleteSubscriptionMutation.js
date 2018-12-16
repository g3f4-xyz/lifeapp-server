const { GraphQLString, GraphQLID } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');
const { deleteSubscriptions } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'deleteSubscriptionsMutation',
  inputFields: {
    id: { type: GraphQLID },
  },
  outputFields: {
    id: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ id }) => {
    console.log(['deleteTaskMutation:mutateAndGetPayload'], ownerId);
    try {
      await deleteSubscriptions(id);

      return {
        id,
      };
    }

    catch (error) {
      console.error(['deleteTaskMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
