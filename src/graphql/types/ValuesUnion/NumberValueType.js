const { GraphQLObjectType, GraphQLFloat } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NumberValueType',
  description: 'number value type',
  fields: () => ({
    number: {
      type: GraphQLFloat,
    },
  }),
});
