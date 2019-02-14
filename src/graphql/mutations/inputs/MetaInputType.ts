import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { MetaOptionsSetInputType } from './MetaOptionsSetInputType';
import { OptionsInputType } from './OptionsInputType';

export const MetaInputType = new GraphQLInputObjectType({
  name: 'MetaInputType',
  description: 'meta input type',
  fields: () => ({
    type: {
      type: GraphQLString,
    },
    required: {
      type: GraphQLBoolean,
    },
    min: {
      type: GraphQLString,
    },
    max: {
      type: GraphQLString,
    },
    minLength: {
      type: GraphQLInt,
    },
    maxLength: {
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
