import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const ChoiceValueInputType = new GraphQLInputObjectType({
  name: 'ChoiceValueInputType',
  description: 'choice value input type',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
  }),
});
