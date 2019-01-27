import { GraphQLID, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ROUTES } from '../../config';
import { cleanApplication } from '../../db/api';

export const cleanApplicationMutation = mutationWithClientMutationId({
  name: 'cleanApplicationMutation',
  inputFields: {
    ownerId: { type: GraphQLID },
  },
  outputFields: {
    navigationUrl: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ ownerId }: any) => {
    try {
      await cleanApplication(ownerId);

      return {
        navigationUrl: ROUTES.AUTH,
      };
    } catch (error) {
      return error;
    }
  },
});
