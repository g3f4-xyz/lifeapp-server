import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Connection, connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';
import { getTaskList } from '../../db/api';
import { IContext, ITask } from '../../db/interfaces';
import { TaskTypeConnection } from '../connections';
import { nodeInterface } from '../nodeDefinitions';

export const TaskListType = new GraphQLObjectType<boolean, IContext>({
  name: 'TaskListType',
  description: 'task list type',
  fields: () => ({
    id: globalIdField('TaskList'),
    list: {
      type: new GraphQLNonNull(TaskTypeConnection),
      description: 'task list type',
      args: connectionArgs,
      resolve: async (
        _,
        args,
        { user: { id }},
      ): Promise<Connection<ITask>> => connectionFromArray(await getTaskList(id), args),
    },
  }),
  interfaces: [nodeInterface],
});
