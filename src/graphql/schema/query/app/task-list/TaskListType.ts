import { GraphQLObjectType } from 'graphql';
import {
  connectionArgs,
  connectionFromArray,
  globalIdField,
} from 'graphql-relay';
import { TaskTypeConnection } from '../../../../connections';
import { nodeInterface } from '../../../../nodeDefinitions';

export const TaskListType = new GraphQLObjectType({
  name: 'Tasks',
  fields: () => ({
    id: globalIdField('Tasks'),
    list: {
      type: TaskTypeConnection,
      args: connectionArgs,
      resolve: (source, args) => {
        return connectionFromArray(source.list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
