import { SettingsApi } from '../db/api/settings/settingsApi';
import { TaskApi } from '../db/api/task/taskApi';
import AppError from '../utils/AppError';

export enum AppServiceErrorCode {
  CLEAN_APPLICATION_ERROR = 'CLEAN_APPLICATION_ERROR',
}

export default class UserService {
  constructor(readonly taskApi: TaskApi, readonly settingsApi: SettingsApi) {}

  async cleanApplication(ownerId: string): Promise<string> {
    try {
      await Promise.race([
        await this.taskApi.deleteTasks(ownerId),
        await this.settingsApi.deleteSettings(ownerId),
      ]);

      return ownerId;
    } catch (e) {
      throw new AppError(
        AppServiceErrorCode.CLEAN_APPLICATION_ERROR,
        'service',
      );
    }
  }
}
