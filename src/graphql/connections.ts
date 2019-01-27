import { connectionDefinitions } from 'graphql-relay';
import { SubscriptionType } from './types/SubscriptionType';
import { TaskType } from './types/TaskType';
import { TaskTypeType } from './types/TaskTypeType';

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
