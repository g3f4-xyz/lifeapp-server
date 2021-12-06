import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const updateTaskListTitleFilterSettingMutation = mutationWithClientMutationId(
  {
    name: 'UpdateTaskListTitleFilterSetting',
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
    mutateAndGetPayload: async ({ title }, { settingsService }: Context) => {
      try {
        return {
          title: await settingsService.updateTaskListTitleFilter(title),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
