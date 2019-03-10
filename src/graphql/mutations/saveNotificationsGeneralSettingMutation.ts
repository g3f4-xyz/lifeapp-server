import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { saveNotificationsGeneralSetting } from '../../db/api';
import { NotificationsGeneralSettingType } from '../types/settings/notifications/NotificationsGeneralSettingType';
import { SettingsNotificationsGeneralInputType } from './inputs/SettingsNotificationsGeneralInputType';

export const saveNotificationsGeneralSettingMutation = mutationWithClientMutationId({
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
  mutateAndGetPayload: async ({ general }, { user }) => {
    try {
      const { id: ownerId } = user;

      const savedGeneral = await saveNotificationsGeneralSetting(ownerId, general);

      return { savedGeneral };
    } catch (error) {
      return error;
    }
  },
});
