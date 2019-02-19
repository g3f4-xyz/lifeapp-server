import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export const TripleChoiceValueInputType = new GraphQLInputObjectType({
  name: 'TripleChoiceValueInputType',
  description: 'partial choice value input type',
  fields: () => ({
    ownValue: {
      type: GraphQLString,
    },
    childrenValue: {
      type: new GraphQLInputObjectType({
        name: 'TripleChoiceChildrenValueInputType',
        fields: () => ({
          ownValue: {
            type: GraphQLString,
          },
          childrenValue: {
            type: new GraphQLInputObjectType({
              name: 'TripleChoiceNestedChildrenValueInputType',
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
