import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext, IFieldMeta } from '../../../db/interfaces';
import { FieldTypeEnum } from '../Enums/FieldTypeEnum';

export const SwitchMetaType: GraphQLObjectType<IFieldMeta, IContext> = new GraphQLObjectType({
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
