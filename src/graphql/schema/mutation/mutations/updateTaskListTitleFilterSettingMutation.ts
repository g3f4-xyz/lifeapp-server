import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const updateTaskListTitleFilterSettingMutation = mutationWithClientMutationId(
  {
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
    mutateAndGetPayload: async (
      { title },
      { user, settingsService }: Context,
    ) => {
      try {
        const { id: ownerId } = user;

        return {
          title: await settingsService.updateTaskListTitleFilter(
            ownerId,
            title,
          ),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
