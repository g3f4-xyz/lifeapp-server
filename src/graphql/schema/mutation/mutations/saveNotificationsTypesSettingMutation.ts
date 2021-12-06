import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { NotificationsTypesSettingType } from '../../query/app/settings/notifications/NotificationsTypesSettingType';
import { SettingsNotificationsTypesInputType } from './inputs/settings/SettingsNotificationsTypesInputType';

export const saveNotificationsTypesSettingMutation = mutationWithClientMutationId(
  {
    name: 'SaveNotificationsTypesSetting',
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
    mutateAndGetPayload: async ({ types }, { settingsService }: Context) => {
      try {
        const savedTypes = await settingsService.updateNotificationsTypes(
          types,
        );

        return { savedTypes };
      } catch (error) {
        return error;
      }
    },
  },
);
