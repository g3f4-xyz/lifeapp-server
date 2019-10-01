import { GraphQLObjectType } from 'graphql';
import { Context, FieldValue } from '../../../../../../../db/interfaces';
import { ValuesUnion } from './ValuesUnion';

export const NestedValueType: GraphQLObjectType<
  FieldValue,
  Context
> = new GraphQLObjectType({
  name: 'NestedValueType',
  description: 'nested value type',
  fields: () => ({
    ownValue: {
      type: ValuesUnion,
    },
    childrenValue: {
      type: NestedValueType,
    },
  }),
});
