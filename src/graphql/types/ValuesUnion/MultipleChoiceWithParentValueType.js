const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'MultipleChoiceWithParentValueType',
  describe: 'choice value type',
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
