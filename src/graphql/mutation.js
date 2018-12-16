const { GraphQLObjectType } = require('graphql');
const deleteSettings = require('./mutations/deleteSettingsMutation');
const deleteSubscription = require('./mutations/deleteSubscriptionMutation');
const deleteSubscriptions = require('./mutations/deleteSubscriptionsMutation');
const deleteTask = require('./mutations/deleteTaskMutation');
const saveSettings = require('./mutations/saveSettingsMutation');
const saveTask = require('./mutations/saveTaskMutation');
const saveTaskType = require('./mutations/saveTaskTypeMutation');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    deleteSettings,
    deleteSubscription,
    deleteSubscriptions,
    deleteTask,
    saveSettings,
    saveTask,
    saveTaskType,
  }),
});
