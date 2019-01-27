import { GraphQLBoolean, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { MetaOptionsSetInputType } from './MetaOptionsSetInputType';
import { OptionsInputType } from './OptionsInputType';

export const MetaInputType = new GraphQLInputObjectType({
  name: 'MetaInputType',
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
    parentID: {
      type: GraphQLString,
    },
    options: {
      type: new GraphQLList(OptionsInputType),
    },
    optionsSet: {
      description: 'options set',
      type: new GraphQLList(MetaOptionsSetInputType),
    },
  }),
});
