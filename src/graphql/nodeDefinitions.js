const { nodeDefinitions } = require('graphql-relay');
const idFetcher = require('./idFetcher');
const typeResolver = require('./types/resolver');

const { nodeInterface, nodeField } = nodeDefinitions(idFetcher, typeResolver);

module.exports = { nodeInterface, nodeField };
