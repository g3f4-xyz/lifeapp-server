import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { ChoiceOptionsMetaType } from './ChoiceOptionsType';

export const ChoiceMetaType = new GraphQLObjectType({
  name: 'ChoiceMetaType',
  description: 'choice meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: GraphQLBoolean,
    },
    defaultValue: {
      description: 'defaultValue',
      type: GraphQLString,
    },
    options: {
      description: 'options',
      type: new GraphQLList(ChoiceOptionsMetaType),
    },
  }),
});
