const { GraphQLBoolean } = require('graphql');
const { fromGlobalId, mutationWithClientMutationId, cursorForObjectInConnection } = require('graphql-relay');
const { TaskTypeEdge } = require('../connections');
const { DEMO_USER } = require('../../config');
const { saveTask, getTaskList } = require('../../db/api');
const taskInputType = require('./inputs/taskInputType');

module.exports = mutationWithClientMutationId({
  name: 'saveTaskMutation',
  inputFields: {
    isNew: {
      type: GraphQLBoolean,
    },
    task: {
      type: taskInputType,
    },
  },
  outputFields: {
    newTaskEdge: {
      type: TaskTypeEdge,
      resolve: async task => {
        const tasks = await getTaskList({ ownerId: task.ownerId });

        return {
          node: task,
          cursor: cursorForObjectInConnection(tasks, task),
        };
      },
    },
  },
  mutateAndGetPayload: async ({ isNew, task: { id: hashId, ...task } }, { user = DEMO_USER }) => {
    console.log(['saveTaskMutation:mutateAndGetPayload'], { isNew, hashId });
    const { id: taskId } = await fromGlobalId(hashId);

    return await saveTask({
      isNew,
      taskId,
      task: {
        ...task,
        ownerId: user.id,
      },
    });
  },
});
