const { connectionDefinitions } = require('graphql-relay');
const TaskType = require('./types/TaskType');
const TaskTypeType = require('./types/TaskTypeType');

const { connectionType: TaskTypeConnection, edgeType: TaskTypeEdge } = connectionDefinitions({ name: 'TaskType', nodeType: TaskType });
const { connectionType: TaskTypeTypeConnection, edgeType: TaskTypeTypeEdge } = connectionDefinitions({ name: 'TaskTypeType', nodeType: TaskTypeType });

module.exports = { 
  TaskTypeConnection,
  TaskTypeEdge,
  TaskTypeTypeConnection,
  TaskTypeTypeEdge,
};
