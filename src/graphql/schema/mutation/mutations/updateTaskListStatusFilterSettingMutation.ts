import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
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
    mutateAndGetPayload: async (
      { status },
      { user, settingsService }: Context,
    ) => {
      try {
        const { id: ownerId } = user;

        return {
          status: await settingsService.updateTaskListStatusFilterSetting(
            ownerId,
            status,
          ),
        };
      } catch (error) {
        return error;
      }
    },
  },
);
