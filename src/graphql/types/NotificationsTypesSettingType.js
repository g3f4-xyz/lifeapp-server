const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'NotificationsGeneralSettingType',
  description: 'notifications general setting type',
  fields: () => ({
    id: globalIdField('NotificationsGeneralSettingType', ({ _id }) => _id),
    show: {
      type: GraphQLBoolean,
    },
    vibrate: {
      type: GraphQLBoolean,
    },
  }),
  interfaces: [nodeInterface],
});
