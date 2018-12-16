const { GraphQLObjectType } = require('graphql');

const cleanApplication = require('./mutations/cleanApplicationMutation');
const deleteSettings = require('./mutations/deleteSettingsMutation');
const deleteSubscription = require('./mutations/deleteSubscriptionMutation');
const deleteSubscriptions = require('./mutations/deleteSubscriptionsMutation');
const deleteTask = require('./mutations/deleteTaskMutation');
const saveSettings = require('./mutations/saveSettingsMutation');
const saveTask = require('./mutations/saveTaskMutation');
const saveTaskType = require('./mutations/saveTaskTypeMutation');
const testSubscription = require('./mutations/testSubscriptionMutation');

module.exports = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    cleanApplication,
    deleteSettings,
    deleteSubscription,
    deleteSubscriptions,
    deleteTask,
    saveSettings,
    saveTask,
    saveTaskType,
    testSubscription,
  }),
});
