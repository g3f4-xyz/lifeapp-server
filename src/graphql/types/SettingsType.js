const { GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const NotificationsType = require('./NotificationsType');

module.exports = new GraphQLObjectType({
  name: 'SettingsType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('SettingsType', ({ _id }) => _id),
    notifications: {
      type: NotificationsType,
    },
    ownerId: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});
