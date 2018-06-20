const { GraphQLObjectType, GraphQLBoolean } = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'BoolMetaType',
  description: 'bool meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
    },
  }),
});
