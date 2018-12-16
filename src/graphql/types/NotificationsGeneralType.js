const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'NotificationsGeneralType',
  description: 'notifications general type',
  fields: () => ({
    id: globalIdField('NotificationsGeneralType', ({ _id }) => _id),
    show: {
      type: GraphQLBoolean,
    },
    vibrate: {
      type: GraphQLBoolean,
    },
  }),
  interfaces: [nodeInterface],
});
