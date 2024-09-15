import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';

export const updateTaskListTaskTypeFilterSettingMutation =
  mutationWithClientMutationId({
    name: 'UpdateTaskListTaskTypeFilterSetting',
    inputFields: {
      taskType: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(GraphQLString)),
        ),
      },
    },
    outputFields: {
      taskType: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(GraphQLString)),
        ),
      },
    },
    mutateAndGetPayload: async ({ taskType }, { settingsService }: Context) => {
      try {
        return {
          taskType:
            await settingsService.updateTaskListTaskTypeFilter(taskType),
        };
      } catch (error) {
        return error;
      }
    },
  });
