import { TASK_TYPE } from '../constants';
import { TaskApi } from '../db/api/task/taskApi';

const taskApiStub: TaskApi = {
  async deleteTask(id) {
    return Promise.resolve(id);
  },
  async saveTask(task) {
    return Promise.resolve(task);
  },
  async getTask(id) {
    return Promise.resolve({
      _id: id,
      taskType: TASK_TYPE.TODO,
      fields: [],
      ownerId: '1',
    });
  },
  async getEmptyTask(ownerId, taskType) {
    return Promise.resolve({
      ownerId,
      taskType,
      _id: '1',
      fields: [],
    });
  },
  async deleteTasks(ownerId) {
    return Promise.resolve(ownerId);
  },
  async getTaskList(ownerId, _filters) {
    return Promise.resolve([
      {
        ownerId,
        _id: '1',
        taskType: TASK_TYPE.TODO,
        fields: [],
      },
    ]);
  },
};

export default taskApiStub;
