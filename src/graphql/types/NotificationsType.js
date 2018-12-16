const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');
const { SubscriptionTypeConnection } = require('../connections');
const TaskTypeNotificationsType = require('./TaskTypeNotificationsType');

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
      type: SubscriptionTypeConnection,
      description: 'subscriptions connection type',
      args: connectionArgs,
      resolve: ({ subscriptions }, args) => {
        console.log(['{ subscriptions }'], { subscriptions })
        return connectionFromArray(subscriptions, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
