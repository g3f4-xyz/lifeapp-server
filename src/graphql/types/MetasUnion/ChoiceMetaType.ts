import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext, IFieldMeta } from '../../../db/interfaces';
import { ChoiceOptionsMetaType } from './ChoiceOptionsType';

export const ChoiceMetaType: GraphQLObjectType<IFieldMeta, IContext> = new GraphQLObjectType({
  name: 'ChoiceMetaType',
  description: 'choice meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    defaultValue: {
      description: 'defaultValue',
      type: GraphQLString,
    },
    options: {
      description: 'options',
      type: new GraphQLNonNull(new GraphQLList(ChoiceOptionsMetaType)),
    },
    label: {
      description: 'label field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    helperText: {
      description: 'helperText field description',
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
