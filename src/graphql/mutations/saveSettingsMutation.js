const { GraphQLBoolean, GraphQLString } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const { DEMO_USER } = require('../../config');
const SettingsInputType = require('./inputs/SettingsInputType');
const { saveSettings } = require('../../db/api');

module.exports = mutationWithClientMutationId({
  name: 'saveSettingsMutation',
  inputFields: {
    isNew: {
      type: GraphQLBoolean,
    },
    hashId: {
      type: GraphQLString,
    },
    settings: {
      type: SettingsInputType,
    },
  },
  outputFields: {
    settingsId: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ isNew, hashId, settings }, { user = DEMO_USER }) => {
    console.log(['saveSettingsMutation:mutateAndGetPayload'], { isNew, hashId, settings, user });
    try {
      const { id: ownerId } = user;
      const { id } = fromGlobalId(hashId);

      await saveSettings(id, { isNew, settings, ownerId });

      return {
        settingsId: hashId,
      };
    }

    catch (error) {
      console.error(['saveSettingsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
