import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const MultipleChoiceWithParentValueType = new GraphQLObjectType({
  name: 'MultipleChoiceWithParentValueType',
  description: 'choice value type',
  fields: () => ({
    ids: {
      type: GraphQLList(GraphQLString),
    },
    customValueOptionValue: {
      type: GraphQLString,
    },
    parentValue: {
      type: GraphQLString,
    },
  }),
});
