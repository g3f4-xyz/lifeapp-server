const { GraphQLSchema } = require('graphql');
const mutation = require('./mutation');
const query = require('./query');

module.exports = new GraphQLSchema({
  mutation,
  query,
});
