import { SettingsApi } from '../db/api/settings/settingsApi';
import { TaskApi } from '../db/api/task/taskApi';

export default class AppService {
  constructor(readonly taskApi: TaskApi, readonly settingsApi: SettingsApi) {}

  async cleanApplication(ownerId: string): Promise<string> {
    await this.settingsApi.deleteSettings(ownerId);
    await this.taskApi.deleteTasks(ownerId);

    return ownerId;
  }
}
