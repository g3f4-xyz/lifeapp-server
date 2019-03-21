import { GraphQLInputObjectType, GraphQLInt, GraphQLNonNull } from 'graphql';

export const SliderValueInputType = new GraphQLInputObjectType({
  name: 'SliderValueInputType',
  description: 'slider value input type',
  fields: () => ({
    progress: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
