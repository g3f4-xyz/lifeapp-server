import { TaskType } from '../../interfaces';
import { TaskTypeModel } from '../../models/TaskTypeModel';

const taskTypeApi = {
  async getTaskType(id: string): Promise<TaskType> {
    return (await TaskTypeModel.findById(id)).toJSON();
  },
  async getTaskTypeList(): Promise<TaskType[]> {
    const taskTypeList = await TaskTypeModel.find({
      parentTypeIds: { $exists: true },
    }).sort({ _id: -1 });

    return taskTypeList.map(model => model.toJSON());
  },
};

export default taskTypeApi;

export type TaskTypeApi = typeof taskTypeApi;
