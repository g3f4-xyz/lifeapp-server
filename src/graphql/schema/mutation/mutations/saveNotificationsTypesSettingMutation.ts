import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { saveNotificationsTypesSetting } from '../../../../db/api/api';
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
    mutateAndGetPayload: async ({ types }, { user }) => {
      try {
        const { id: ownerId } = user;

        const savedTypes = await saveNotificationsTypesSetting(ownerId, types);

        return { savedTypes };
      } catch (error) {
        return error;
      }
    },
  },
);
