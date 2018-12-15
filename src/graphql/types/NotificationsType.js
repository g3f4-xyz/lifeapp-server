const { GraphQLBoolean, GraphQLList, GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const TaskTypeNotificationsType = require('./TaskTypeNotificationsType');
const SubscriptionType = require('./SubscriptionType');

module.exports = new GraphQLObjectType({
  name: 'NotificationsType',
  description: 'notifications type',
  fields: () => ({
    id: globalIdField('NotificationsType', ({ _id }) => _id),
    daily: {
      type: TaskTypeNotificationsType,
      resolve: ({ daily }) => ({ id: 'daily', ...daily })
    },
    show: {
      type: GraphQLBoolean,
    },
    single: {
      type: TaskTypeNotificationsType,
      resolve: ({ single }) => ({ id: 'single', ...single })
    },
    subscriptions: {
      type: new GraphQLList(SubscriptionType),
    },
  }),
  interfaces: [nodeInterface],
});
