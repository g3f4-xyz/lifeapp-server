import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ChoiceOptionsMetaInputType = new GraphQLInputObjectType({
  name: 'ChoiceOptionsMetaInputType',
  description: 'choice options meta input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLString,
    },
  }),
});
