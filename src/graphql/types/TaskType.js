const { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField } = require('graphql-relay');
const { nodeInterface } = require('../nodeDefinitions');
const FieldType = require('./FieldType');

module.exports = new GraphQLObjectType({
  name: 'TaskType',
  description: 'task type',
  fields: () => ({
    id: globalIdField('TaskType', ({ _id }) => _id),
    taskType: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
      resolve: ({ fields }) => fields.find(({ fieldId }) => fieldId === 'TITLE').value.text,
    },
    note: {
      type: GraphQLString,
      resolve: ({ fields }) => fields.find(({ fieldId }) => fieldId === 'NOTE').value.text,
    },
    priority: {
      type: GraphQLBoolean,
      resolve: ({ fields }) => fields.find(({ fieldId }) => fieldId === 'PRIORITY').value.bool,
    },
    status: {
      type: GraphQLString,
      resolve: ({ fields }) => fields.find(({ fieldId }) => fieldId === 'STATUS').value.id,
    },
    fields: {
      type: new GraphQLList(FieldType),
      args: {
        filterByIds: { type: new GraphQLList(GraphQLString) },
      },
      resolve: ({ fields }, args) =>
        args && args.filterByIds ? fields.filter(({ fieldId }) => args.filterByIds.includes(fieldId)) : fields,
    },
  }),
  interfaces: [nodeInterface],
});
