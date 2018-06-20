const { GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');
const { TaskTypeConnection } = require('../connections');
const { nodeInterface } = require('../nodeDefinitions');
const { getTaskList } = require('../../api');

module.exports = new GraphQLObjectType({
  name: 'TaskListType',
  description: 'task list type',
  fields: () => ({
    id: globalIdField('TaskList'),
    list: {
      type: TaskTypeConnection,
      description: 'task list type',
      args: connectionArgs,
      resolve: async ({ id }, args) => {
        const list = await getTaskList({ ownerId: id });

        return connectionFromArray(list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
