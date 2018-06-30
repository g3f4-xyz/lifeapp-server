const { GraphQLList, GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLInputObjectType, GraphQLString } = require('graphql');
const optionsInputType = require('./optionsInputType');
const ChoiceOptionsInputType = require('./ChoiceOptionsInputType');

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
    parentId: {
      type: GraphQLString,
    },
    options: {
      type: optionsInputType,
    },
    optionsSet: {
      description: 'optionsSet',
      type: new GraphQLList(new GraphQLInputObjectType({
        name: 'metaOptionsSetInputType',
        fields: () => ({
          customValueOptionMask: {
            type: GraphQLString,
          },
          parentValue: {
            type: GraphQLString,
          },
          options: {
            type: ChoiceOptionsInputType,
          },
        }),
      })),
    },
  }),
});
