import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { cursorForObjectInConnection, fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { getTaskList, saveTask } from '../../db/api';
import { ITask } from '../../db/interfaces';
import { TaskTypeEdge } from '../connections';
import { TaskInputType } from './inputs/TaskInputType';

export const saveTaskMutation = mutationWithClientMutationId({
  name: 'saveTaskMutation',
  inputFields: {
    isNew: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    task: {
      type: new GraphQLNonNull(TaskInputType),
    },
  },
  outputFields: {
    newTaskEdge: {
      type: new GraphQLNonNull(TaskTypeEdge),
      resolve: async (task: ITask) => {
        const tasks = await getTaskList(task.ownerId);

        return {
          node: task,
          cursor: cursorForObjectInConnection(tasks, task),
        };
      },
    },
  },
  mutateAndGetPayload: async ({ isNew, task: { id: hashId, ...task } }, { user: { id: ownerId } }) => {
    const { id: taskId } = await fromGlobalId(hashId);

    return await saveTask({
      isNew,
      taskId,
      task: {
        ...task,
        ownerId,
      },
    });
  },
});
