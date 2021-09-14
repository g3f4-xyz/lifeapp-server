import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const ChoiceValueType = new GraphQLObjectType({
  name: 'ChoiceFieldValue',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
