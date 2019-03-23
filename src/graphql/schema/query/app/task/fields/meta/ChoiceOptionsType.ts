import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const ChoiceOptionsMetaType = new GraphQLObjectType({
  name: 'ChoiceOptionsMetaType',
  description: 'choice options meta type',
  fields: () => ({
    text: {
      description: 'text',
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      description: 'value',
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
