import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { NotificationsGeneralSettingType } from '../../query/app/settings/notifications/NotificationsGeneralSettingType';
import { SettingsNotificationsGeneralInputType } from './inputs/settings/SettingsNotificationsGeneralInputType';

export const saveNotificationsGeneralSettingMutation = mutationWithClientMutationId(
  {
    name: 'saveNotificationsGeneralSettingMutation',
    inputFields: {
      general: {
        type: SettingsNotificationsGeneralInputType,
      },
    },
    outputFields: {
      savedGeneral: {
        type: new GraphQLNonNull(NotificationsGeneralSettingType),
      },
    },
    mutateAndGetPayload: async (
      { general },
      { user, settingsService }: Context,
    ) => {
      try {
        const { id: ownerId } = user;

        const savedGeneral = await settingsService.updateNotificationsGeneralSetting(
          ownerId,
          general,
        );

        return { savedGeneral };
      } catch (error) {
        return error;
      }
    },
  },
);
