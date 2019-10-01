import {
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';
import { ChoiceOptionsMetaType } from './ChoiceOptionsType';

export const ChoiceMetaType: GraphQLObjectType<
  FieldMeta,
  Context
> = new GraphQLObjectType({
  name: 'ChoiceMetaType',
  description: 'choice meta type',
  fields: () => ({
    fieldType: {
      description: 'fieldType',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
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
