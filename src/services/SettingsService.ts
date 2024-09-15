import { TaskStatus, TaskTypeId } from '../constants';
import SettingsApi from '../db/api/settings/SettingsApi';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTaskType,
} from '../db/interfaces';

export default class SettingsService {
  constructor(private readonly settingsApi: SettingsApi) {}

  async getSettings(): Promise<Settings> {
    return await this.settingsApi.getSettings();
  }

  async updateTaskListTitleFilter(title: string): Promise<string> {
    return (await this.settingsApi.saveTaskListTitleFilter(title)).value;
  }

  async updateTaskListTaskTypeFilter(
    taskType: TaskTypeId[],
  ): Promise<TaskTypeId[]> {
    return (await this.settingsApi.saveTaskListTaskTypeFilter(taskType)).value;
  }

  async updateTaskListStatusFilter(
    taskStatus: TaskStatus[],
  ): Promise<TaskStatus[]> {
    return (await this.settingsApi.saveTaskListStatusFilter(taskStatus)).value;
  }

  async updateNotificationsGeneral(
    general: SettingsNotificationsGeneral,
  ): Promise<SettingsNotificationsGeneral> {
    return await this.settingsApi.saveNotificationsGeneral(general);
  }

  async updateNotificationsTypes(
    types: SettingsNotificationsTaskType,
  ): Promise<SettingsNotificationsTaskType> {
    return await this.settingsApi.saveNotificationsTypes(types);
  }
}
