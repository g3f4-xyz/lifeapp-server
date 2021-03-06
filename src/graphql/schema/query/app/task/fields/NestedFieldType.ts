import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Context, Field } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { NestedMetaType } from './meta/NestedMetaType';
import { NestedValueType } from './value/NestedValueType';

export const NestedFieldType: GraphQLObjectType<
  Field,
  Context
> = new GraphQLObjectType<Field, Context>({
  name: 'NestedFieldType',
  description: 'nested field type',
  fields: () => ({
    id: globalIdField('NestedFieldType'),
    fieldId: {
      description: 'fieldId field description',
      type: new GraphQLNonNull(FieldIdEnum),
    },
    order: {
      description: 'order field description',
      type: new GraphQLNonNull(GraphQLInt),
    },
    fieldType: {
      description: 'field type description',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    value: {
      description: 'nested value field description',
      type: new GraphQLNonNull(NestedValueType),
    },
    meta: {
      description: 'nested meta field description',
      type: new GraphQLNonNull(NestedMetaType),
      resolve(field) {
        const { fieldType, meta } = field;

        return { ...meta, fieldType };
      },
    },
  }),
  interfaces: [nodeInterface],
});
