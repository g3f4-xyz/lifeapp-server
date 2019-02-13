import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';
import { FieldFormatEnum } from './Enums/FieldFormatEnum';
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
    format: {
      description: 'format field description',
      type: new GraphQLNonNull(FieldFormatEnum),
    },
    order: {
      description: 'order field description',
      type: new GraphQLNonNull(GraphQLInt),
    },
    type: {
      description: 'type field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    label: {
      description: 'label field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      description: 'value field description',
      type: new GraphQLNonNull(ValuesUnion),
      resolve: ({ format, value }) => ({ format, ...value }),
    },
    helperText: {
      description: 'helperText field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    meta: {
      description: 'meta field description',
      type: new GraphQLNonNull(MetasUnion),
      resolve: ({ format, meta }) => ({ format, ...meta }),
    },
  }),
  interfaces: [nodeInterface],
});
