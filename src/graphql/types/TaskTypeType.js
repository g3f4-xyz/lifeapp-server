const { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const FieldType = require('./FieldType');

module.exports = new GraphQLObjectType({
  name: 'TaskTypeType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('TaskTypeType', ({ _id }) => _id),
    typeId: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    isCustom: {
      type: GraphQLBoolean,
    },
    parentId: {
      type: GraphQLString,
    },
    fields: {
      type: new GraphQLList(FieldType),
    },
  }),
  interfaces: [nodeInterface],
});
