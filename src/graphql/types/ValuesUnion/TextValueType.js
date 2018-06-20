const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'TextValueType',
  describe: 'text value type',
  fields: () => ({
    text: {
      type: GraphQLString,
    },
  }),
});
