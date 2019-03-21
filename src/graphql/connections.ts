import { connectionDefinitions } from 'graphql-relay';
import { SubscriptionType } from './schema/query/app/settings/notifications/SubscriptionType';
import { TaskType } from './schema/query/app/task/TaskType';
import { TaskTypeType } from './schema/query/app/task-type-list/TaskTypeType';

export const {
  connectionType: TaskTypeConnection,
  edgeType: TaskTypeEdge,
} = connectionDefinitions({ name: 'TaskType', nodeType: TaskType });

export const {
  connectionType: TaskTypeTypeConnection,
  edgeType: TaskTypeTypeEdge,
} = connectionDefinitions({ name: 'TaskTypeType', nodeType: TaskTypeType });

export const {
  connectionType: SubscriptionTypeConnection,
  edgeType: SubscriptionTypeEdge,
} = connectionDefinitions({ name: 'SubscriptionType', nodeType: SubscriptionType });
