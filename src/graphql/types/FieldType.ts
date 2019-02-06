import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { MetasUnion } from './MetasUnion/MetasUnion';
import { ValuesUnion } from './ValuesUnion/ValuesUnion';

export const FieldType = new GraphQLObjectType({
  name: 'FieldType',
  description: 'field type',
  fields: () => ({
    fieldId: {
      description: 'fieldId field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    format: {
      description: 'format field description',
      type: new GraphQLNonNull(GraphQLString),
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
});
