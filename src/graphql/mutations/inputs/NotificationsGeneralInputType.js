const { GraphQLBoolean, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'NotificationsGeneralInputType',
  description: 'notifications general input type',
  fields: () => ({
    show: {
      type: GraphQLBoolean,
    },
    vibrate: {
      type: GraphQLBoolean,
    },
  }),
});
