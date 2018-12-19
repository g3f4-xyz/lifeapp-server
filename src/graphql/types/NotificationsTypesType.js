const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'NotificationsTypesType',
  description: 'notifications types type',
  fields: () => ({
    id: globalIdField('NotificationsTypesType', ({ id }) => id),
    events: {
      type: GraphQLBoolean,
    },
    meetings: {
      type: GraphQLBoolean,
    },
    todos: {
      type: GraphQLBoolean,
    },
    routines: {
      type: GraphQLBoolean,
    },
  }),
  interfaces: [nodeInterface],
});
