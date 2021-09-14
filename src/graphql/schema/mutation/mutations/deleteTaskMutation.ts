import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const deleteTaskMutation = mutationWithClientMutationId({
  name: 'DeleteTask',
  inputFields: {
    id: { type: GraphQLID },
  },
  outputFields: {
    deletedTaskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id: hashId }, { taskService }: Context) => {
    try {
      const { id } = await fromGlobalId(hashId);

      await taskService.deleteTask(id);

      return { deletedTaskId: hashId };
    } catch (error) {
      return error;
    }
  },
});
