import { GraphQLBoolean, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

export const BoolValueInputType = new GraphQLInputObjectType({
  name: 'BoolValueInputType',
  description: 'choice value input type',
  fields: () => ({
    bool: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
