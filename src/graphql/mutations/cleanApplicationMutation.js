const { GraphQLString, GraphQLID } = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');

const { cleanApplication } = require('../../db/api');
const { ROUTES } = require('../../config');

module.exports = mutationWithClientMutationId({
  name: 'cleanApplicationMutation',
  inputFields: {
    ownerId: { type: GraphQLID },
  },
  outputFields: {
    navigationUrl: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ ownerId }) => {
    console.log(['cleanApplicationMutation:mutateAndGetPayload'], ownerId);
    try {
      await cleanApplication(ownerId);

      return {
        navigationUrl: ROUTES.AUTH,
      };
    }

    catch (error) {
      console.error(['cleanApplicationMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
