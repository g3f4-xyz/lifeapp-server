import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { ChoiceOptionsMetaType } from './ChoiceOptionsType';

export const OptionsMapType = new GraphQLObjectType({
  name: 'OptionsMapType',
  description: 'options map type',
  fields: () => ({
    customValueOptionMask: {
      type: GraphQLString,
    },
    parentValue: {
      description: 'parentValue',
      type: GraphQLString,
    },
    options: {
      description: 'options',
      type: new GraphQLList(ChoiceOptionsMetaType),
    },
  }),
});
