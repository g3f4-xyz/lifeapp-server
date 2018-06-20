const { GraphQLObjectType, GraphQLBoolean, GraphQLFloat } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NumberMetaType',
  description: 'number meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
    },
    min: {
      description: 'min',
      type: GraphQLFloat,
    },
    max: {
      description: 'max',
      type: GraphQLFloat,
    },
  }),
});
