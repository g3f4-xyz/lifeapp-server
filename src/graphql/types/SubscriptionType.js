const { GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'SubscriptionType',
  description: 'subscription type',
  fields: () => ({
    id: globalIdField('SubscriptionType', ({ _id }) => _id),
    userAgent: {
      type: GraphQLString,
    },
    userDeviceType: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});
