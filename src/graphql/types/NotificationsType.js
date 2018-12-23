const { GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');
const { SubscriptionTypeConnection } = require('../connections');
const NotificationsGeneralSettingType = require('./NotificationsGeneralSettingType');
const NotificationsTypesSettingType = require('./NotificationsTypesSettingType');

module.exports = new GraphQLObjectType({
  name: 'NotificationsType',
  description: 'notifications type',
  fields: () => ({
    id: globalIdField('NotificationsType', ({ _id }) => _id),
    types: {
      type: NotificationsTypesSettingType,
    },
    general: {
      type: NotificationsGeneralSettingType,
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
