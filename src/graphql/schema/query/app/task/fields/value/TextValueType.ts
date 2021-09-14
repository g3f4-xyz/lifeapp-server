import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const TextValueType = new GraphQLObjectType({
  name: 'TextFieldValue',
  fields: () => ({
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
