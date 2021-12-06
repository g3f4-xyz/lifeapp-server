import { GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { TaskStatusEnum } from '../../../enums/TaskStatusEnum';

export const updateTaskListStatusFilterSettingMutation = mutationWithClientMutationId(
  {
    name: 'UpdateTaskListStatusFilterSetting',
    inputFields: {
      taskStatus: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(TaskStatusEnum)),
        ),
      },
    },
    outputFields: {
      taskStatus: {
        type: new GraphQLNonNull(
          new GraphQLList(new GraphQLNonNull(TaskStatusEnum)),
        ),
      },
    },
    mutateAndGetPayload: async (
      { taskStatus },
      { settingsService }: Context,
    ) => {
      try {
        return {
          taskStatus: await settingsService.updateTaskListStatusFilter(
            taskStatus,
          ),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
