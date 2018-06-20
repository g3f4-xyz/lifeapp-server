const { GraphQLID, GraphQLString, GraphQLInputObjectType } = require('graphql');
const fieldsInputType = require('./fieldsInputType');

module.exports = new GraphQLInputObjectType({
  name: 'taskInputType',
  description: 'task input type',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    taskType: {
      type: GraphQLString,
    },
    fields: {
      type: fieldsInputType,
    },
  }),
});
