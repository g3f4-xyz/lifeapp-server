import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const TextValueInputType = new GraphQLInputObjectType({
  name: 'TextValueInputType',
  description: 'text value input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});
