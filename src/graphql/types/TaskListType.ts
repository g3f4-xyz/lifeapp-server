import { GraphQLObjectType } from 'graphql';
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
      type: TaskTypeConnection,
      description: 'task list type',
      args: connectionArgs,
      resolve: async (
        _,
        args,
        { user: { id }},
      ): Promise<Connection<ITask>> => {
        const list = await getTaskList(id);

        return connectionFromArray(list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
