const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'ChoiceValueType',
  describe: 'choice value type',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
  }),
});
