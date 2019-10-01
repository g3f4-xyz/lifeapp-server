import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';

export const SliderMetaType: GraphQLObjectType<FieldMeta, Context> = new GraphQLObjectType({
  name: 'SliderMetaType',
  description: 'slider meta type',
  fields: () => ({
    fieldType: {
      description: 'fieldType field meta description',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    disabled: {
      description: 'disabled field meta description',
      type: GraphQLBoolean,
    },
    required: {
      description: 'required field meta description',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    label: {
      description: 'label field meta description',
      type: new GraphQLNonNull(GraphQLString),
    },
    min: {
      description: 'min field meta description',
      type: GraphQLInt,
    },
    max: {
      description: 'max field meta description',
      type: GraphQLInt,
    },
    step: {
      description: 'step field meta description',
      type: GraphQLInt,
    },
  }),
});
