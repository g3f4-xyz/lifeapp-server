import { GraphQLList, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskListTaskTypeFilterSetting } from '../../../../db/api';
import { TaskTypeEnum } from '../../../enums/TaskTypeEnum';

export const updateTaskListTaskTypeFilterSettingMutation = mutationWithClientMutationId({
  name: 'updateTaskListTaskTypeFilterSettingMutation',
  inputFields: {
    taskType: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskTypeEnum))),
    },
  },
  outputFields: {
    taskType: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskTypeEnum))),
    },
  },
  mutateAndGetPayload: async ({ taskType }, { user }) => {
    try {
      const { id: ownerId } = user;

      return {
        taskType: await updateTaskListTaskTypeFilterSetting(ownerId, taskType),
      };
    } catch (error) {
      return error;
    }
  },
});
