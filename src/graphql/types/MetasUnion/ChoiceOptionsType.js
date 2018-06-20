const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLList(new GraphQLObjectType({
  name: 'ChoiceOptionsMetaType',
  description: 'choice options meta type',
  fields: () => ({
    text: {
      description: 'text',
      type: GraphQLString,
    },
    value: {
      description: 'value',
      type: GraphQLString,
    },
  }),
}));
