import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskListTitleFilterSetting } from '../../db/api';

export const updateTaskListTitleFilterSettingMutation = mutationWithClientMutationId({
  name: 'updateTaskListTitleFilterSettingMutation',
  inputFields: {
    title: {
      type: GraphQLString,
    },
  },
  outputFields: {
    title: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ title }, { user }) => {
    try {
      const { id: ownerId } = user;

      return {
        title: await updateTaskListTitleFilterSetting(ownerId, title),
      };
    } catch (error) {
      return error;
    }
  },
});
