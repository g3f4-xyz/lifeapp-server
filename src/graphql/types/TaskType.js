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
      resolve: ({ fields }) => {
        const field = fields.find(({ fieldId }) => fieldId === 'TITLE');
        if (field) {
          return field.value.text;
        }

        return null;
      },
    },
    note: {
      type: GraphQLString,
      resolve: ({ fields }) => {
        const field = fields.find(({ fieldId }) => fieldId === 'NOTE');
        if (field) {
          return field.value.text;
        }

        return null;
      },
    },
    priority: {
      type: GraphQLBoolean,
      resolve: ({ fields }) => {
        const field = fields.find(({ fieldId }) => fieldId === 'PRIORITY');
        if (field) {
          return field.value.bool;
        }

        return null;
      },
    },
    status: {
      type: GraphQLString,
      resolve: ({ fields }) => {
        const field = fields.find(({ fieldId }) => fieldId === 'STATUS');
        if (field) {
          return field.value.id;
        }

        return null;
      },
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
