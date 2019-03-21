import { GraphQLInputObjectType } from 'graphql';
import { LeafFieldValueInputType } from './LeafFieldValueInputType';

export const NestedValueInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'NestedValueInputType',
  description: 'nested choice value input type',
  fields: () => ({
    ownValue: {
      type: LeafFieldValueInputType,
    },
    childrenValue: {
      type: NestedValueInputType,
    },
  }),
});
