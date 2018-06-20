const { GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLInputObjectType({
  name: 'valueInputType',
  description: 'value input type',
  fields: () => ({
    bool: {
      type: GraphQLBoolean,
    },
    text: {
      type: GraphQLString,
    },
    number: {
      type: GraphQLInt,
    },
    id: {
      type: GraphQLString,
    },
  }),
});
