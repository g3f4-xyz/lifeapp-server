const { GraphQLString, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'AuthenticationInputType',
  description: 'authentication input type',
  fields: () => ({
    provider: {
      type: GraphQLString,
    },
  }),
});
