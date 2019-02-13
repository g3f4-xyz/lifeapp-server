import { GraphQLFloat, GraphQLInputObjectType } from 'graphql';

export const NumberValueInputType = new GraphQLInputObjectType({
  name: 'NumberValueInputType',
  description: 'number value input type',
  fields: () => ({
    number: {
      type: GraphQLFloat,
    },
  }),
});
