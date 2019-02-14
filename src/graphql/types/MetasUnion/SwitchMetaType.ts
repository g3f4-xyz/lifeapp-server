import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const SwitchMetaType = new GraphQLObjectType({
  name: 'SwitchMetaType',
  description: 'switch meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
