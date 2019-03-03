import { GraphQLInputObjectType } from 'graphql';
import { ValueInputType } from '../ValueInputType';

export const NestedValueInputType = new GraphQLInputObjectType({
  name: 'NestedValueInputType',
  description: 'nested choice value input type',
  fields: () => ({
    ownValue: {
      type: ValueInputType,
    },
    childrenValue: {
      type: new GraphQLInputObjectType({
        name: 'NestedChildrenValueInputType',
        fields: () => ({
          ownValue: {
            type: ValueInputType,
          },
          childrenValue: {
            type: new GraphQLInputObjectType({
              name: 'NestedNestedChildrenValueInputType',
              fields: () => ({
                ownValue: {
                  type: ValueInputType,
                },
                childrenValue: {
                  type: ValueInputType,
                },
              }),
            }),
          },
        }),
      }),
    },
  }),
});
