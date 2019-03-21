import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';
import { IContext, ITask } from '../../../../../db/interfaces';
import { TaskTypeConnection } from '../../../../connections';
import { nodeInterface } from '../../../../nodeDefinitions';

export const TaskListType = new GraphQLObjectType<ITask[], IContext>({
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
