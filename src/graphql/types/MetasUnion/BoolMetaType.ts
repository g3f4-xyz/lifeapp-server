import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const BoolMetaType = new GraphQLObjectType({
  name: 'BoolMetaType',
  description: 'bool meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
