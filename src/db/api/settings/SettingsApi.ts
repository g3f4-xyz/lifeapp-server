import AuthContext from '../../../AuthContext';
import { TaskStatus, TaskTypeId } from '../../../constants';
import WebClient from '../../../utils/WebClient';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
} from '../../interfaces';

export default class SettingsApi {
  private readonly host = 'http://localhost:9002'; // TODO move to env
  private readonly webClient: WebClient;

  constructor(private readonly authContext: AuthContext) {
    this.webClient = new WebClient(this.host, authContext);
  }

  async getSettings() {
    return this.webClient.get<Settings>('/settings');
  }

  async saveNotificationsGeneral(
    general: SettingsNotificationsGeneral,
  ): Promise<SettingsNotificationsGeneral> {
    return this.webClient.post('/settings/notifications/general', general);
  }

  async saveNotificationsTypes(
    types: SettingsNotificationsTypes,
  ): Promise<SettingsNotificationsTypes> {
    return this.webClient.post('/settings/notifications/types', types);
  }

  async saveTaskListStatusFilter(
    taskStatus: TaskStatus[],
  ): Promise<{ value: TaskStatus[] }> {
    return await this.webClient.post('/settings/taskList/filters/status', {
      value: taskStatus,
    });
  }

  async saveTaskListTitleFilter(title: string): Promise<{ value: string }> {
    return this.webClient.post('/settings/taskList/filters/title', {
      value: title,
    });
  }

  async saveTaskListTaskTypeFilter(
    taskType: TaskTypeId[],
  ): Promise<{ value: TaskTypeId[] }> {
    return this.webClient.post('/settings/taskList/filters/taskType', {
      value: taskType,
    });
  }
}
