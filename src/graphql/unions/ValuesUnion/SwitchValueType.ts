import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const SwitchValueType = new GraphQLObjectType({
  name: 'SwitchValueType',
  description: 'switch value type',
  fields: () => ({
    enabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
