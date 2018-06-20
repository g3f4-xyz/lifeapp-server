const { GraphQLList, GraphQLString, GraphQLInputObjectType } = require('graphql');

module.exports = new GraphQLList(new GraphQLInputObjectType({
  name: 'optionsInputType',
  description: 'options input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLString,
    },
  }),
}));
