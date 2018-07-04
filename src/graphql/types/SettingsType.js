const { GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const AuthenticationType = require('./AuthenticationType');
const NotificationsType = require('./NotificationsType');

module.exports = new GraphQLObjectType({
  name: 'SettingsType',
  description: 'task type type',
  fields: () => ({
    authentication: {
      type: AuthenticationType,
    },
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
