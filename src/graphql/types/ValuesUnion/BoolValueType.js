const { GraphQLBoolean, GraphQLObjectType } = require('graphql');

module.exports =  new GraphQLObjectType({
  name: 'BoolValueType',
  describe: 'choice value type',
  fields: () => ({
    bool: {
      type: GraphQLBoolean,
    },
  }),
});
