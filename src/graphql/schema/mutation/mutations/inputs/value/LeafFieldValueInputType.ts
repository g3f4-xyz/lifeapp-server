import { GraphQLBoolean, GraphQLInputObjectType, GraphQLString } from 'graphql';

export const LeafFieldValueInputType = new GraphQLInputObjectType({
  name: 'LeafFieldValueInputType',
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
