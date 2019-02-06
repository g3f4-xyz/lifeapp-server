import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const TextMetaType = new GraphQLObjectType({
  name: 'TextMetaType',
  description: 'text meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    minLen: {
      description: 'minLen',
      type: new GraphQLNonNull(GraphQLInt),
    },
    maxLen: {
      description: 'maxLen',
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
});
