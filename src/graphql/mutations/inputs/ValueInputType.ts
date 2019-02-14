import { GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql';

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
    ids: {
      type: new GraphQLList(GraphQLString),
    },
    text: {
      type: GraphQLString,
    },
  }),
});
