const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const TaskTypeNotificationsType = require('./TaskTypeNotificationsType');

module.exports = new GraphQLObjectType({
  name: 'NotificationsType',
  description: 'notifications type',
  fields: () => ({
    id: globalIdField('NotificationsType', ({ _id }) => _id),
    daily: {
      type: TaskTypeNotificationsType,
    },
    show: {
      type: GraphQLBoolean,
    },
    single: {
      type: TaskTypeNotificationsType,
    },
  }),
  interfaces: [nodeInterface],
});
