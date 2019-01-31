import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const OptionsInputType = new GraphQLInputObjectType({
  name: 'OptionsInputType',
  description: 'options input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLString,
    },
  }),
});
