import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';
import { ValueInputType } from './ValueInputType';

export const FieldsInputType = new GraphQLInputObjectType({
  name: 'FieldsInputType',
  description: 'fields input type',
  fields: () => ({
    order: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    value: {
      type: new GraphQLNonNull(ValueInputType),
    },
  }),
});
