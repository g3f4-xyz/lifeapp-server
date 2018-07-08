const { GraphQLString, GraphQLInputObjectType } = require('graphql');
const AuthenticationInputType = require('./AuthenticationInputType');
const NotificationsInputType = require('./NotificationsInputType');

module.exports = new GraphQLInputObjectType({
  name: 'SettingsInputType',
  description: 'settings input type',
  fields: () => ({
    authentication: {
      type: AuthenticationInputType,
    },
    notifications: {
      type: NotificationsInputType,
    },
    ownerId: {
      type: GraphQLString,
    },
  }),
});
