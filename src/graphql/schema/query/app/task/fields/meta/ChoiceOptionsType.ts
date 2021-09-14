import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const ChoiceOptionsMetaType = new GraphQLObjectType({
  name: 'ChoiceFieldOptionsMeta',
  fields: () => ({
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
