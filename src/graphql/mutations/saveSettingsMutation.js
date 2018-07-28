const { GraphQLBoolean, GraphQLString } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const { DEMO_USER } = require('../../config');
const SettingsType = require('../types/SettingsType');
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
    settings: {
      type: SettingsType,
    },
  },
  mutateAndGetPayload: async ({ isNew, hashId, settings }, { user = DEMO_USER }) => {
    console.log(['saveSettingsMutation:mutateAndGetPayload'], { isNew, hashId, settings, user });
    try {
      const { id: ownerId } = user;
      const { id } = fromGlobalId(hashId);

      return {
        settings: await saveSettings(id, { isNew, settings, ownerId }),
      };
    }

    catch (error) {
      console.error(['saveSettingsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
