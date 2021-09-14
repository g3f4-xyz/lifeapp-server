import { GraphQLInputObjectType } from 'graphql';
import { ValueInputType } from './ValueInputType';

export const NestedValueInputType: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'NestedValueInput',
    fields: () => ({
      ownValue: {
        type: ValueInputType,
      },
      childrenValue: {
        type: NestedValueInputType,
      },
    }),
  },
);
