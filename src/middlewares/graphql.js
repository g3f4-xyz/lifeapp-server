const graphQLHTTP = require('express-graphql');
const schema = require('../graphql/schema');
const { DEMO_USER } = require('../config');

module.exports = graphQLHTTP(req => ({
  schema, pretty: true, graphiql: true, rootValue: { user: req.user || DEMO_USER },
}));
