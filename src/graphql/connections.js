const { connectionDefinitions } = require('graphql-relay');
const TaskType = require('./types/TaskType');
const TaskTypeType = require('./types/TaskTypeType');
const SubscriptionType = require('./types/SubscriptionType');

const { connectionType: TaskTypeConnection, edgeType: TaskTypeEdge } = connectionDefinitions({ name: 'TaskType', nodeType: TaskType });
const { connectionType: TaskTypeTypeConnection, edgeType: TaskTypeTypeEdge } = connectionDefinitions({ name: 'TaskTypeType', nodeType: TaskTypeType });
const { connectionType: SubscriptionTypeConnection, edgeType: SubscriptionTypeEdge } = connectionDefinitions({ name: 'SubscriptionType', nodeType: SubscriptionType });

module.exports = {
  TaskTypeConnection,
  TaskTypeEdge,
  TaskTypeTypeConnection,
  TaskTypeTypeEdge,
  SubscriptionTypeConnection,
  SubscriptionTypeEdge,
};
