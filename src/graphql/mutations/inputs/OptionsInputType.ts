import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export const OptionsInputType = new GraphQLInputObjectType({
  name: 'OptionsInputType',
  description: 'options input type',
  fields: () => ({
    text: {
      type: new GraphQLNonNull(GraphQLString),
    },
    value: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
