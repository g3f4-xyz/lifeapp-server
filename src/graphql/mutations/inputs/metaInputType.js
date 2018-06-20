const { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLInputObjectType, GraphQLString } = require('graphql');
const optionsInputType = require('./optionsInputType');

module.exports = new GraphQLInputObjectType({
  name: 'metaInputType',
  description: 'meta input type',
  fields: () => ({
    required: {
      type: GraphQLBoolean,
    },
    min: {
      type: GraphQLFloat,
    },
    max: {
      type: GraphQLFloat,
    },
    minLen: {
      type: GraphQLInt,
    },
    maxLen: {
      type: GraphQLInt,
    },
    defaultValue: {
      type: GraphQLString,
    },
    options: {
      type: optionsInputType,
    },
  }),
});
