import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const SliderValueType = new GraphQLObjectType({
  name: 'SliderValueType',
  description: 'slider value type',
  fields: () => ({
    progress: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
