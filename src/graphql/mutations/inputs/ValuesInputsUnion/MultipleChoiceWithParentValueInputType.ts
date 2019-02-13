import { GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';

export const MultipleChoiceWithParentValueInputType = new GraphQLInputObjectType({
  name: 'MultipleChoiceWithParentValueInputType',
  description: 'choice value input type',
  fields: () => ({
    ids: {
      type: new GraphQLNonNull(GraphQLList(GraphQLString)),
    },
    customValueOptionValue: {
      type: GraphQLString,
    },
    parentValue: {
      type: GraphQLString,
    },
  }),
});
