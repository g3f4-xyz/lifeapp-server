const { GraphQLBoolean, GraphQLObjectType } = require('graphql');
const { globalIdField } = require('graphql-relay');

const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'NotificationsTypesSettingType',
  description: 'notifications types setting type',
  fields: () => ({
    id: globalIdField('NotificationsTypesSettingType', ({ _id }) => _id),
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
