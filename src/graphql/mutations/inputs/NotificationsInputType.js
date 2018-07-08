const { GraphQLBoolean, GraphQLInputObjectType } = require('graphql');
const TaskTypeNotificationsInputType = require('./TaskTypeNotificationsInputType');

module.exports = new GraphQLInputObjectType({
  name: 'NotificationsInputType',
  description: 'notifications input type',
  fields: () => ({
    daily: {
      type: TaskTypeNotificationsInputType,
    },
    show: {
      type: GraphQLBoolean,
    },
    single: {
      type: TaskTypeNotificationsInputType,
    },
  }),
});
