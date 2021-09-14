import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const SwitchValueType = new GraphQLObjectType({
  name: 'SwitchFieldValue',
  fields: () => ({
    enabled: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
