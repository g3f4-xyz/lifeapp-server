import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';

export const ValueInputType = new GraphQLInputObjectType({
  name: 'ValueInputType',
  description: 'value input type',
  fields: () => ({
    bool: {
      type: GraphQLBoolean,
    },
    id: {
      type: GraphQLString,
    },
    ids: {
      type: new GraphQLList(GraphQLString),
    },
    customValueOptionValue: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLInt,
    },
    parentValue: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
  }),
});
