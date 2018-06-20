const { GraphQLObjectType, GraphQLBoolean, GraphQLInt } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'TextMetaType',
  description: 'text meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
    },
    minLen: {
      description: 'minLen',
      type: GraphQLInt,
    },
    maxLen: {
      description: 'maxLen',
      type: GraphQLInt,
    },
  }),
});
