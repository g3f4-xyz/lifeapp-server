import { GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql';
import { OptionsInputType } from './OptionsInputType';

export const MetaOptionsSetInputType = new GraphQLInputObjectType({
  name: 'MetaOptionsSetInputType',
  fields: () => ({
    customValueOptionMask: {
      type: GraphQLString,
    },
    parentValue: {
      type: GraphQLString,
    },
    options: {
      type: new GraphQLList(OptionsInputType),
    },
  }),
});
