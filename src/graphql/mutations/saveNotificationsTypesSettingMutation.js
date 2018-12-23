const { mutationWithClientMutationId } = require('graphql-relay');
const NotificationsTypesSettingInputType = require('./inputs/NotificationsTypesSettingInputType');
const NotificationsTypesSettingType = require('../types/NotificationsTypesSettingType');
const { saveNotificationsTypesSetting } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'saveNotificationsTypesSettingMutation',
  inputFields: {
    types: {
      type: NotificationsTypesSettingInputType,
    },
  },
  outputFields: {
    savedTypes: {
      type: NotificationsTypesSettingType,
    },
  },
  mutateAndGetPayload: async ({ types }, { user }) => {
    console.log(['saveNotificationsTypesSettingsMutation:mutateAndGetPayload'], { types, user });
    try {
      const { id: ownerId } = user;

      const savedTypes = await saveNotificationsTypesSetting(ownerId, types);

      return { savedTypes };
    }

    catch (error) {
      console.error(['saveSettingsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
