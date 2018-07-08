const { GraphQLBoolean, GraphQLString } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId } = require('graphql-relay');
const SettingsType = require('../types/SettingsType');
const SettingsInputType = require('./inputs/SettingsInputType');
const { saveSettings } = require('../../api');

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
  mutateAndGetPayload: async ({ isNew, hashId, settings }) => {
    console.log(['saveSettingsMutation:mutateAndGetPayload'], { isNew, hashId, settings });
    try {
      const { id } = fromGlobalId(hashId);

      return {
        settings: await saveSettings(id, { isNew, settings }),
      };
    }

    catch (error) {
      console.error(['saveSettingsMutation:mutateAndGetPayload:error'], error);

      return error;
    }
  },
});
