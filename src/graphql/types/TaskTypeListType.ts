import { GraphQLObjectType } from 'graphql';
import { Connection, connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';
import { getTaskTypeList } from '../../db/api';
import { IContext, ITaskType } from '../../db/interfaces';
import { TaskTypeTypeConnection } from '../connections';
import { nodeInterface } from '../nodeDefinitions';

export const TaskTypeListType = new GraphQLObjectType<boolean, IContext>({
  name: 'TaskTypeListType',
  description: 'task type list type',
  fields: () => ({
    id: globalIdField('TaskTypeList'),
    list: {
      type: TaskTypeTypeConnection,
      description: 'task type list type',
      args: connectionArgs,
      resolve: async (_, args): Promise<Connection<ITaskType>> => {
        const list = await getTaskTypeList();

        return connectionFromArray(list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
