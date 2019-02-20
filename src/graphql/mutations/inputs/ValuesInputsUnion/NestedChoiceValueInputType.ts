import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const NestedChoiceValueInputType = new GraphQLInputObjectType({
  name: 'NestedChoiceValueInputType',
  description: 'partial choice value input type',
  fields: () => ({
    ownValue: {
      type: GraphQLString,
    },
    childrenValue: {
      type: new GraphQLInputObjectType({
        name: 'NestedChoiceChildrenValueInputType',
        fields: () => ({
          ownValue: {
            type: GraphQLString,
          },
          childrenValue: {
            type: new GraphQLInputObjectType({
              name: 'NestedChoiceNestedChildrenValueInputType',
              fields: () => ({
                ownValue: {
                  type: GraphQLString,
                },
                childrenValue: {
                  type: GraphQLString,
                },
              }),
            }),
          },
        }),
      }),
    },
  }),
});
