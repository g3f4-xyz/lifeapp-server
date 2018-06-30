const { GraphQLList, GraphQLInputObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLList(new GraphQLInputObjectType({
  name: 'ChoiceOptionsMetaInputType',
  description: 'choice options meta input type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
    value: {
      type: GraphQLString,
    },
  }),
}));
