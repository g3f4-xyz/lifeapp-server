import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';

export const SwitchMetaType: GraphQLObjectType<FieldMeta, Context> = new GraphQLObjectType({
  name: 'SwitchMetaType',
  description: 'switch meta type',
  fields: () => ({
    fieldType: {
      description: 'fieldType',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    disabled: {
      description: 'disabled',
      type: GraphQLBoolean,
    },
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    label: {
      description: 'label field description',
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
