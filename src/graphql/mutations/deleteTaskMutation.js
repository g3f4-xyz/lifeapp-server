const { GraphQLString, GraphQLID } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const { deleteTask } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'deleteTaskMutation',
  inputFields: {
    id: { type: GraphQLID },
  },
  outputFields: {
    deletedTaskId: {
      type: GraphQLString,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: async ({ id: hashId }) => {
    console.log(['deleteTaskMutation:mutateAndGetPayload'], hashId);
    try {
      const { id } = await fromGlobalId(hashId);

      await deleteTask(id);

      return {
        id: hashId,
      };
    }

    catch (error) {
      console.error(['deleteTaskMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
