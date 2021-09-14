import { GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const SliderValueType = new GraphQLObjectType({
  name: 'SliderFieldValue',
  fields: () => ({
    progress: {
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});
