import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionFromArray, globalIdField } from 'graphql-relay';
import { IContext, ITaskType } from '../../db/interfaces';
import { TaskTypeTypeConnection } from '../connections';
import { nodeInterface } from '../nodeDefinitions';

export const TaskTypeListType = new GraphQLObjectType<ITaskType[], IContext>({
  name: 'TaskTypeListType',
  description: 'task type list type',
  fields: () => ({
    id: globalIdField('TaskTypeList'),
    list: {
      type: new GraphQLNonNull(TaskTypeTypeConnection),
      description: 'task type list type',
      args: connectionArgs,
      resolve: connectionFromArray,
    },
  }),
  interfaces: [nodeInterface],
});
