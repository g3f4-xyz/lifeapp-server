import { mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskListStatusFilterSetting } from '../../../../db/api/api';
import { TaskStatusEnum } from '../../../enums/TaskStatusEnum';

export const updateTaskListStatusFilterSettingMutation = mutationWithClientMutationId(
  {
    name: 'updateTaskListStatusFilterSettingMutation',
    inputFields: {
      status: {
        type: TaskStatusEnum,
      },
    },
    outputFields: {
      status: {
        type: TaskStatusEnum,
      },
    },
    mutateAndGetPayload: async ({ status }, { user }) => {
      try {
        const { id: ownerId } = user;

        return {
          status: await updateTaskListStatusFilterSetting(ownerId, status),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
