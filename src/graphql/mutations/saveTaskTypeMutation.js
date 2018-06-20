const { GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLID } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const TaskTypeListType = require('../types/TaskTypeListType');
const { TaskTypeTypeEdge } = require('../connections');
const { saveTaskType, getTaskTypeList } = require('../../api');
const fieldsInputType = require('./inputs/fieldsInputType');

module.exports = mutationWithClientMutationId({
  name: 'saveTaskTypeMutation',
  inputFields: {
    typeId: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    isNew: {
      type: GraphQLBoolean,
    },
    isCustom: {
      type: GraphQLBoolean,
    },
    parentId: {
      type: GraphQLString,
    },
    fields: {
      type: fieldsInputType,
    },
  },
  outputFields: {
    newTaskTypeEdge: {
      type: TaskTypeTypeEdge,
      resolve: async node => {
        console.log(['saveTaskTypeMutation.outputFields.newTaskEdge'], node);
        const tasks = await getTaskTypeList();

        return {
          node,
          cursor: cursorForObjectInConnection(tasks, node),
        };
      },
    },
    taskTypeList: {
      type: TaskTypeListType,
      resolve: () => true,
    },
  },
  mutateAndGetPayload: async ({ isNew, taskType: { id: hashId, ...taskType } }) => {
    console.log(['saveTaskTypeMutation.mutateAndGetPayload'], { isNew, hashId });
    const { id: taskTypeId } = await fromGlobalId(hashId);

    return await saveTaskType({ isNew, taskTypeId, taskType });
  },
});
