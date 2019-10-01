import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import { NestedValueInputType } from './NestedValueInputType';

export const ValueInputType: GraphQLInputObjectType = new GraphQLInputObjectType(
  {
    name: 'ValueInputType',
    description: 'value input type',
    fields: () => ({
      enabled: {
        type: GraphQLBoolean,
      },
      id: {
        type: GraphQLString,
      },
      text: {
        type: GraphQLString,
      },
      progress: {
        type: GraphQLFloat,
      },
      ownValue: {
        type: ValueInputType,
      },
      childrenValue: {
        type: NestedValueInputType,
      },
    }),
  },
);
