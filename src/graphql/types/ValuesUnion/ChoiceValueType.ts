import { GraphQLObjectType, GraphQLString } from 'graphql';

export const ChoiceValueType = new GraphQLObjectType({
  name: 'ChoiceValueType',
  description: 'choice value type',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
  }),
});
