const { GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');
const { SubscriptionTypeConnection } = require('../connections');
const NotificationsTypesType = require('./NotificationsTypesType');
const NotificationsGeneralType = require('./NotificationsGeneralType');

module.exports = new GraphQLObjectType({
  name: 'NotificationsType',
  description: 'notifications type',
  fields: () => ({
    id: globalIdField('NotificationsType', ({ _id }) => _id),
    types: {
      type: NotificationsTypesType,
    },
    general: {
      type: NotificationsGeneralType,
    },
    subscriptions: {
      type: SubscriptionTypeConnection,
      description: 'subscriptions connection type',
      args: connectionArgs,
      resolve: ({ subscriptions }, args) => connectionFromArray(subscriptions, args),
    },
  }),
  interfaces: [nodeInterface],
});
