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
  name: 'ChoiceFieldMeta',
  fields: () => ({
    fieldType: {
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    required: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    defaultValue: {
      type: GraphQLString,
    },
    options: {
      type: new GraphQLNonNull(new GraphQLList(ChoiceOptionsMetaType)),
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    helperText: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
