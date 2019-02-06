import { GraphQLBoolean, GraphQLFloat, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const NumberMetaType = new GraphQLObjectType({
  name: 'NumberMetaType',
  description: 'number meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    min: {
      description: 'min',
      type: new GraphQLNonNull(GraphQLFloat),
    },
    max: {
      description: 'max',
      type: new GraphQLNonNull(GraphQLFloat),
    },
  }),
});
