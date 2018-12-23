const { mutationWithClientMutationId } = require('graphql-relay');
const NotificationsGeneralSettingInputType = require('./inputs/NotificationsGeneralSettingInputType');
const { saveNotificationsGeneralSetting } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'saveNotificationsGeneralSettingsMutation',
  inputFields: {
    general: {
      type: NotificationsGeneralSettingInputType,
    },
  },
  outputFields: {
    savedGeneral: {
      type: NotificationsGeneralSettingType,
    },
  },
  mutateAndGetPayload: async ({ general }, { user }) => {
    console.log(['saveNotificationsGeneralSettingsMutation:mutateAndGetPayload'], { general, user });
    try {
      const { id: ownerId } = user;

      const savedGeneral = await saveNotificationsGeneralSetting(ownerId, general);

      return { savedGeneral };
    }

    catch (error) {
      console.error(['saveSettingsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
