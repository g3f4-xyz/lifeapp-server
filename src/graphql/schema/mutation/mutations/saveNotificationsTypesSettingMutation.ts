import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { NotificationsTypesSettingType } from '../../query/app/settings/notifications/NotificationsTypesSettingType';
import { SettingsNotificationsTypesInputType } from './inputs/settings/SettingsNotificationsTypesInputType';

export const saveNotificationsTypesSettingMutation = mutationWithClientMutationId(
  {
    name: 'saveNotificationsTypesSettingMutation',
    inputFields: {
      types: {
        type: SettingsNotificationsTypesInputType,
      },
    },
    outputFields: {
      savedTypes: {
        type: new GraphQLNonNull(NotificationsTypesSettingType),
      },
    },
    mutateAndGetPayload: async (
      { types },
      { user, settingsService }: Context,
    ) => {
      try {
        const { id: ownerId } = user;

        const savedTypes = await settingsService.updateNotificationsTypesSetting(
          ownerId,
          types,
        );

        return { savedTypes };
      } catch (error) {
        return error;
      }
    },
  },
);
