const { GraphQLList, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'valueInputType',
  description: 'value input type',
  fields: () => ({
    bool: {
      type: GraphQLBoolean,
    },
    id: {
      type: GraphQLString,
    },
    ids: {
      type: new GraphQLList(GraphQLString),
    },
    customValueOptionValue: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLInt,
    },
    parentValue: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
  }),
});
