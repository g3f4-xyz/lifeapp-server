import { GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { TaskTypeEnum } from '../../../enums/TaskTypeEnum';

export const updateTaskListTaskTypeFilterSettingMutation = mutationWithClientMutationId(
  {
    name: 'updateTaskListTaskTypeFilterSettingMutation',
    inputFields: {
      taskType: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(TaskTypeEnum)),
        ),
      },
    },
    outputFields: {
      taskType: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(TaskTypeEnum)),
        ),
      },
    },
    mutateAndGetPayload: async (
      { taskType },
      { user, settingsService }: Context,
    ) => {
      try {
        const { id: ownerId } = user;

        return {
          taskType: await settingsService.updateTaskListTaskTypeFilter(
            ownerId,
            taskType,
          ),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
