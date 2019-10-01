import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';
import { Context, Task } from '../../../../../db/interfaces';
import { TaskTypeConnection } from '../../../../connections';
import { nodeInterface } from '../../../../nodeDefinitions';

export const TaskListType = new GraphQLObjectType<Task[], Context>({
  name: 'TaskListType',
  description: 'task list type',
  fields: () => ({
    id: globalIdField('TaskList'),
    list: {
      type: TaskTypeConnection,
      description: 'task list type',
      args: connectionArgs,
      resolve: connectionFromArray,
    },
  }),
  interfaces: [nodeInterface],
});
