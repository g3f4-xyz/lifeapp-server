import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from 'graphql';
import { MetaInputType } from './MetaInputType';
import { ValueInputType } from './ValueInputType';

export const FieldsInputType = new GraphQLInputObjectType({
  name: 'FieldsInputType',
  description: 'fields input type',
  fields: () => ({
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    format: {
      type: new GraphQLNonNull(GraphQLString),
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      type: new GraphQLNonNull(ValueInputType),
    },
    helperText: {
      type: new GraphQLNonNull(GraphQLString),
    },
    meta: {
      type: new GraphQLNonNull(MetaInputType),
    },
  }),
});
