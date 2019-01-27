import { GraphQLObjectType, GraphQLString } from 'graphql';

export const TextValueType = new GraphQLObjectType({
  name: 'TextValueType',
  description: 'text value type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});
