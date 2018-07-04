const { GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');

module.exports = new GraphQLObjectType({
  name: 'AuthenticationType',
  description: 'authentication type',
  fields: () => ({
    id: globalIdField('AuthenticationType', ({ _id }) => _id),
    provider: {
      type: GraphQLString,
    },
  }),
  interfaces: [nodeInterface],
});
