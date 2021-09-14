import { connectionDefinitions } from 'graphql-relay';
import { TaskType } from './schema/query/app/task/TaskType';

export const {
  connectionType: TaskTypeConnection,
  edgeType: TaskTypeEdge,
} = connectionDefinitions({ name: 'Task', nodeType: TaskType });
