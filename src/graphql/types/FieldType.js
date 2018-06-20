const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const MetasUnion = require('./MetasUnion');
const ValuesUnion = require('./ValuesUnion');

module.exports = new GraphQLObjectType({
  name: 'FieldType',
  description: 'field type',
  fields: () => ({
    fieldId: {
      description: 'fieldId field description',
      type: GraphQLString,
    },
    format: {
      description: 'format field description',
      type: GraphQLString,
    },
    order: {
      description: 'order field description',
      type: GraphQLInt,
    },
    type: {
      description: 'type field description',
      type: GraphQLString,
    },
    label: {
      description: 'label field description',
      type: GraphQLString,
    },
    value: {
      description: 'value field description',
      type: ValuesUnion,
      resolve: ({ format, value }) => ({ format, ...value }),
    },
    helperText: {
      description: 'helperText field description',
      type: GraphQLString,
    },
    meta: {
      description: 'meta field description',
      type: MetasUnion,
      resolve: ({ format, meta }) => ({ format, ...meta }),
    },
  }),
});
