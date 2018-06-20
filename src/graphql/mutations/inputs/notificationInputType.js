const { GraphQLString, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'scheduleNotificationInputType',
  description: 'schedule notification input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});
