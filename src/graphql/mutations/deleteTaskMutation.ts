import { GraphQLID, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { deleteTask } from '../../db/api';

export const deleteTaskMutation = mutationWithClientMutationId({
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
    try {
      const { id } = await fromGlobalId(hashId);

      await deleteTask(id);

      return {
        id: hashId,
      };
    } catch (error) {
      return error;
    }
  },
});
