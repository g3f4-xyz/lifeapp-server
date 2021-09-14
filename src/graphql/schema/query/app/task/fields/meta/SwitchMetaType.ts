import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';

export const SwitchMetaType: GraphQLObjectType<
  FieldMeta,
  Context
> = new GraphQLObjectType({
  name: 'SwitchFieldMeta',
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
  }),
});
