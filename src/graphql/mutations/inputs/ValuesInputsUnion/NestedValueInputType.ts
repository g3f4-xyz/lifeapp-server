import { GraphQLInputObjectType } from 'graphql';
import { ValueInputType } from '../ValueInputType';

export const NestedValueInputType: GraphQLInputObjectType = new GraphQLInputObjectType({
  name: 'NestedValueInputType',
  description: 'nested choice value input type',
  fields: () => ({
    ownValue: {
      type: ValueInputType,
    },
    childrenValue: {
      type: NestedValueInputType,
    },
  }),
});
