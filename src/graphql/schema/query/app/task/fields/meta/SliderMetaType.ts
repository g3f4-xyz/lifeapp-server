import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';

export const SliderMetaType: GraphQLObjectType<
  FieldMeta,
  Context
> = new GraphQLObjectType({
  name: 'SliderFieldMeta',
  fields: () => ({
    fieldType: {
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    disabled: {
      type: GraphQLBoolean,
    },
    required: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    min: {
      type: GraphQLInt,
    },
    max: {
      type: GraphQLInt,
    },
    step: {
      type: GraphQLInt,
    },
  }),
});
