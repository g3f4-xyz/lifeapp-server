import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { ChoiceOptionsMetaType } from './ChoiceOptionsType';

export const OptionsMapType = new GraphQLObjectType({
  name: 'OptionsMapType',
  description: 'options map type',
  fields: () => ({
    customValueOptionMask: {
      type: new GraphQLNonNull(GraphQLString),
    },
    parentValue: {
      description: 'parentValue',
      type: new GraphQLNonNull(GraphQLString),
    },
    options: {
      description: 'options',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ChoiceOptionsMetaType))),
    },
  }),
});
