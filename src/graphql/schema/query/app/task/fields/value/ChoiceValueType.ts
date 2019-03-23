import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const ChoiceValueType = new GraphQLObjectType({
  name: 'ChoiceValueType',
  description: 'choice value type',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
