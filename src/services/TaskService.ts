import produce from 'immer';
import { FieldId, TaskTypeId } from '../constants';
import { SettingsApi } from '../db/api/settings/settingsApi';
import { TaskApi } from '../db/api/task/taskApi';
import { Field, FieldValue, Task } from '../db/interfaces';
import {
  calculateNotificationAt,
  isNotificationAtUpdateNeeded,
} from '../db/models/tasks/TaskModel';

export default class TaskService {
  constructor(
    private readonly taskApi: TaskApi,
    private readonly settingsApi: SettingsApi,
  ) {}

  async deleteTask(taskId: string) {
    return await this.taskApi.deleteTask(taskId);
  }

  async getEmptyTask(ownerId: string, typeId: TaskTypeId): Promise<Task> {
    return await this.taskApi.getEmptyTask(ownerId, typeId);
  }

  async getTask(taskId: string): Promise<Task> {
    return await this.taskApi.getTask(taskId);
  }

  async getTaskList(ownerId: string): Promise<Task[]> {
    const {
      taskList: { filters },
    } = await this.settingsApi.getSettings(ownerId);

    return await this.taskApi.getTaskList(ownerId, filters);
  }

  async updateTaskField(
    taskId: string,
    fieldId: FieldId,
    value: FieldValue,
  ): Promise<Field> {
    const task = await this.taskApi.getTask(taskId);

    const updatedTaskData = produce(task, draftTask => {
      const fieldIndex = draftTask.fields.findIndex(
        field => field.fieldId === fieldId,
      );
      // const validationErrors = draftTask.fields[fieldIndex].validateField();

      draftTask.fields[fieldIndex].value = value;

      if (
        isNotificationAtUpdateNeeded(
          draftTask.typeId,
          draftTask.lastChangedFieldId,
        )
      ) {
        const lastChangedField = draftTask.fields.find(
          field => field.fieldId === draftTask.lastChangedFieldId,
        );

        draftTask.notificationAt = calculateNotificationAt(
          draftTask.typeId,
          draftTask.lastNotificationAt,
          lastChangedField.value,
        );
      }

      draftTask.updatedAt = new Date(Date.now());
      draftTask.lastChangedFieldId = fieldId;
    });

    const updatedTask = await this.taskApi.saveTask(updatedTaskData);

    return updatedTask.fields.find(field => field.fieldId === fieldId);
  }
}
