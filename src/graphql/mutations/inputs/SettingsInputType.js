const { GraphQLString, GraphQLInputObjectType } = require('graphql');
const NotificationsInputType = require('./NotificationsInputType');

module.exports = new GraphQLInputObjectType({
  name: 'SettingsInputType',
  description: 'settings input type',
  fields: () => ({
    notifications: {
      type: NotificationsInputType,
    },
    ownerId: {
      type: GraphQLString,
    },
  }),
});
