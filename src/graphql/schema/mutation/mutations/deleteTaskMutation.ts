import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { deleteTask } from '../../../../db/api/taskApi';

export const deleteTaskMutation = mutationWithClientMutationId({
  name: 'deleteTaskMutation',
  inputFields: {
    id: { type: GraphQLID },
  },
  outputFields: {
    deletedTaskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id: hashId }) => {
    try {
      const { id } = await fromGlobalId(hashId);

      await deleteTask(id);

      return { deletedTaskId: hashId };
    } catch (error) {
      return error;
    }
  },
});
