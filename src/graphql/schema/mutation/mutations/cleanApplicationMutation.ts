import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { ROUTES } from '../../../../config';
import { Context } from '../../../../db/interfaces';

export const cleanApplicationMutation = mutationWithClientMutationId({
  name: 'cleanApplicationMutation',
  inputFields: {
    ownerId: { type: GraphQLID },
  },
  outputFields: {
    navigationUrl: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ ownerId }, { appService }: Context) => {
    try {
      await appService.cleanApplication(ownerId);

      return {
        navigationUrl: ROUTES.AUTH,
      };
    } catch (error) {
      return error;
    }
  },
});
