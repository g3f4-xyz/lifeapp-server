import { GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { saveNotificationsTypesSetting } from '../../db/api';
import { NotificationsTypesSettingType } from '../types/NotificationsTypesSettingType';
import { SettingsNotificationsTypesInputType } from './inputs/SettingsNotificationsTypesInputType';

export const saveNotificationsTypesSettingMutation = mutationWithClientMutationId({
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
});
