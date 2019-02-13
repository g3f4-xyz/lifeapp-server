import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const BoolValueType = new GraphQLObjectType({
  name: 'BoolValueType',
  description: 'choice value type',
  fields: () => ({
    bool: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
