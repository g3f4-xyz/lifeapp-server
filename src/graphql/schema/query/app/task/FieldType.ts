import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, IField } from '../../../../../db/interfaces';
import { nodeInterface } from '../../../../nodeDefinitions';
import { FieldIdEnum } from '../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../enums/FieldTypeEnum';
import { MetasUnion } from '../../../../unions/MetasUnion/MetasUnion';
import { ValuesUnion } from '../../../../unions/ValuesUnion/ValuesUnion';

export const FieldType: GraphQLObjectType<IField, IContext> = new GraphQLObjectType<IField, IContext>({
  name: 'FieldType',
  description: 'field type',
  fields: () => ({
    id: globalIdField('FieldType', ({ _id, fieldId }) => `${_id}|${fieldId}`),
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
      description: 'value field description',
      type: new GraphQLNonNull(ValuesUnion),
    },
    meta: {
      description: 'meta field description',
      type: new GraphQLNonNull(MetasUnion),
      resolve(field) {
        const { fieldType, meta } = field;

        return ({ ...meta, fieldType });
      },
    },
  }),
  interfaces: [nodeInterface],
});