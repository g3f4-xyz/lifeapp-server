import { FieldId, TaskTypeId } from '../constants';
import TaskApi from '../db/api/task/TaskApi';
import { Field, FieldUpdate, FieldValue, Task } from '../db/interfaces';
import SettingsService from './SettingsService';

export default class TaskService {
  constructor(
    private readonly taskApi: TaskApi,
    private readonly settingsService: SettingsService,
  ) {}

  async deleteTask(taskId: string) {
    return await this.taskApi.deleteTask(taskId);
  }

  async getEmptyTask(typeId: TaskTypeId): Promise<Task> {
    return await this.taskApi.addTask(typeId);
  }

  async getTask(taskId: string): Promise<Task> {
    return await this.taskApi.getTask(taskId);
  }

  async getTaskList(): Promise<Task[]> {
    const settings = await this.settingsService.getSettings();
    const {
      taskList: { filters },
    } = settings;

    return await this.taskApi.getTaskList(filters);
  }

  async updateTaskField(
    taskId: string,
    fieldId: FieldId,
    value: FieldValue,
  ): Promise<FieldUpdate> {
    return await this.taskApi.updateTaskField(taskId, fieldId, value);
  }
}
