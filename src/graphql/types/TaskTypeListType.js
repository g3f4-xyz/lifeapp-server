const { GraphQLObjectType } = require('graphql');
const { connectionArgs, connectionFromArray, globalIdField } = require('graphql-relay');
const { TaskTypeTypeConnection } = require('../connections');
const { nodeInterface } = require('../nodeDefinitions');
const { getTaskTypeList } = require('../../api');

module.exports = new GraphQLObjectType({
  name: 'TaskTypeListType',
  description: 'task type list type',
  fields: () => ({
    id: globalIdField('TaskTypeList'),
    list: {
      type: TaskTypeTypeConnection,
      description: 'task type list type',
      args: connectionArgs,
      resolve: async (_, args) => {
        const list = await getTaskTypeList();

        return connectionFromArray(list, args);
      },
    },
  }),
  interfaces: [nodeInterface],
});
