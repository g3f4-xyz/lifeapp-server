import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ValueInputType = new GraphQLInputObjectType({
  name: 'ValueInputType',
  description: 'value input type',
  fields: () => ({
    enabled: {
      type: GraphQLBoolean,
    },
    id: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
  }),
});
