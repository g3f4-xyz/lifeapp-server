import { GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { TaskTypeEnum } from '../../../enums/TaskTypeEnum';

export const updateTaskListTaskTypeFilterSettingMutation = mutationWithClientMutationId(
  {
    name: 'UpdateTaskListTaskTypeFilterSetting',
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
    mutateAndGetPayload: async ({ taskType }, { settingsService }: Context) => {
      try {
        return {
          taskType: await settingsService.updateTaskListTaskTypeFilter(
            taskType,
          ),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
