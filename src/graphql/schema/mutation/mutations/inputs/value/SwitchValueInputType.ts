import { GraphQLBoolean, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';

export const SwitchValueInputType = new GraphQLInputObjectType({
  name: 'SwitchValueInputType',
  description: 'switch value input type',
  fields: () => ({
    enabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
