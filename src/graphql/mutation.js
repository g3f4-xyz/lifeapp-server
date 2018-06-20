const { GraphQLObjectType } = require('graphql');
const deleteTask = require('./mutations/deleteTaskMutation');
const saveTask = require('./mutations/saveTaskMutation');
const saveTaskType = require('./mutations/saveTaskTypeMutation');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    deleteTask,
    saveTask,
    saveTaskType,
  }),
});
