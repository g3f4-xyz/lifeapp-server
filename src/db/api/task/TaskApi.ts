import axios from 'axios';
import AuthContext from '../../../AuthContext';
import { FieldId, TaskTypeId } from '../../../constants';
import {
  FieldUpdate,
  FieldValue,
  Task,
  TaskListSettingsFilters,
} from '../../interfaces';

export default class TaskApi {
  private readonly host = 'http://localhost:9001';

  constructor(private readonly authContext: AuthContext) {}

  async deleteTask(taskId: string): Promise<string> {
    const { data } = await axios.delete<string>(`${this.host}/task/${taskId}`, {
      headers: { Authorization: this.authContext.token },
    });

    return data;
  }
  async addTask(typeId: TaskTypeId): Promise<Task> {
    const { data } = await axios.put<Task>(
      `${this.host}/task/${typeId}`,
      null,
      {
        headers: { Authorization: this.authContext.token },
      },
    );

    return data;
  }
  async getTask(taskId: string): Promise<Task> {
    const { data } = await axios.get<Task>(`${this.host}/task/${taskId}`, {
      headers: { Authorization: this.authContext.token },
    });

    return data;
  }
  async updateTaskField(
    taskId: string,
    fieldId: FieldId,
    value: FieldValue,
  ): Promise<FieldUpdate> {
    const { data } = await axios.post<FieldUpdate>(
      `${this.host}/task/updateField`,
      { taskId, fieldId, value },
      {
        headers: { Authorization: this.authContext.token },
      },
    );

    return data;
  }
  async getTaskList(filters: TaskListSettingsFilters): Promise<Task[]> {
    const { data } = await axios.get<{ items: Task[] }>(
      `${this.host}/tasks?${buildFiltersQueryParams(filters)}`,
      {
        headers: { Authorization: this.authContext.token },
      },
    );

    return data.items;
  }
}

function buildFiltersQueryParams(filters: TaskListSettingsFilters) {
  let queryParamsString = `title=${
    filters.title
  }&taskType=${filters.taskType.join(',')}`;

  if (filters.status) {
    queryParamsString = `${queryParamsString}&status=${filters.status}`;
  }

  return queryParamsString;
}
