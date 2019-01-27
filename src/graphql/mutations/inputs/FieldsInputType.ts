import { GraphQLInputObjectType, GraphQLInt, GraphQLString } from 'graphql';
import { MetaInputType } from './MetaInputType';
import { ValueInputType } from './ValueInputType';

export const FieldsInputType = new GraphQLInputObjectType({
  name: 'FieldsInputType',
  description: 'fields input type',
  fields: () => ({
    fieldId: {
      type: GraphQLString,
    },
    format: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    type: {
      type: GraphQLString,
    },
    label: {
      type: GraphQLString,
    },
    value: {
      type: ValueInputType,
    },
    helperText: {
      type: GraphQLString,
    },
    meta: {
      type: MetaInputType,
    },
  }),
});
