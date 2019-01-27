import { GraphQLFloat, GraphQLObjectType } from 'graphql';

export const NumberValueType = new GraphQLObjectType({
  name: 'NumberValueType',
  description: 'number value type',
  fields: () => ({
    number: {
      type: GraphQLFloat,
    },
  }),
});
