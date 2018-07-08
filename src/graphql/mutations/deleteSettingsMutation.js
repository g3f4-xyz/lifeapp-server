const { GraphQLString, GraphQLID } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const { deleteTask } = require('../../api');

module.exports = mutationWithClientMutationId({
  name: 'deleteSettingsMutation',
  inputFields: {
    hashId: { type: GraphQLID },
  },
  outputFields: {
    ownerId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ hashId }) => {
    console.log(['deleteSettingsMutation:mutateAndGetPayload'], hashId);
    try {
      const { id } = await fromGlobalId(hashId);

      await deleteTask(id);

      return {
        id: hashId,
      };
    }

    catch (error) {
      console.error(['deleteSettingsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
