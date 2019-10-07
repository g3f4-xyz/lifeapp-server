import { TaskTypeApi } from '../db/api/task-type/taskTypeApi';
import { TaskType } from '../db/interfaces';

export default class TaskTypeService {
  constructor(readonly taskTypeApi: TaskTypeApi) {}

  async getTaskTypeList(): Promise<TaskType[]> {
    return await this.taskTypeApi.getTaskTypeList();
  }
}
