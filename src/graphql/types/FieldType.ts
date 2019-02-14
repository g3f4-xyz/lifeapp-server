import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';
import { FieldTypeEnum } from './Enums/FieldTypeEnum';
import { MetasUnion } from './MetasUnion/MetasUnion';
import { ValuesUnion } from './ValuesUnion/ValuesUnion';

export const FieldType = new GraphQLObjectType({
  name: 'FieldType',
  description: 'field type',
  fields: () => ({
    id: globalIdField('FieldType', ({ fieldId }) => fieldId),
    fieldId: {
      description: 'fieldId field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    order: {
      description: 'order field description',
      type: new GraphQLNonNull(GraphQLInt),
    },
    type: {
      description: 'field type description',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    label: {
      description: 'label field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      description: 'value field description',
      type: new GraphQLNonNull(ValuesUnion),
      resolve: ({ type, value }) => ({ type, ...value }),
    },
    helperText: {
      description: 'helperText field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    meta: {
      description: 'meta field description',
      type: new GraphQLNonNull(MetasUnion),
      resolve: (field) => {
        const { type, meta } = field;

        return ({ type, ...meta });
      },
    },
  }),
  interfaces: [nodeInterface],
});
