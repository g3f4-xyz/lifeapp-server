const { GraphQLID, GraphQLObjectType, GraphQLString } = require('graphql');
const { globalIdField, fromGlobalId } = require('graphql-relay');
const { getEmptyTask, getTask } = require('../../api');
const TaskType = require('./TaskType');
const TaskListType = require('./TaskListType');
const TaskTypeListType = require('./TaskTypeListType');

module.exports = new GraphQLObjectType({
  name: 'AppType',
  description: 'Application entry point',
  fields: () => ({
    id: globalIdField('App'),
    task: {
      type: TaskType,
      args: {
        id: {
          type: GraphQLID,
        },
        type: {
          type: GraphQLString,
        },
      },
      resolve: async (_, { id, type }) => {
        if (id.length > 0) {
          return await getTask(fromGlobalId(id).id);
        }

        return await getEmptyTask(type);
      },
    },
    taskList: {
      type: TaskListType,
      resolve: root => root,
    },
    taskTypeList: {
      type: TaskTypeListType,
      resolve: () => true,
    },
  }),
});
