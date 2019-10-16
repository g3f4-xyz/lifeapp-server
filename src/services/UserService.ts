import { SettingsApi } from '../db/api/settings/settingsApi';
import { TaskApi } from '../db/api/task/taskApi';
import { UserApi } from '../db/api/user/userApi';
import { User } from '../db/interfaces';
import AppError from '../utils/AppError';

export enum UserServiceErrorCode {
  CLEAN_APPLICATION_ERROR = 'CLEAN_APPLICATION_ERROR',
}

export default class UserService {
  constructor(
    readonly taskApi: TaskApi,
    readonly settingsApi: SettingsApi,
    readonly userApi: UserApi,
  ) {}

  async getUser(userId: string): Promise<User | null> {
    return await this.userApi.findUser(userId);
  }

  async addUser(user: User): Promise<void> {
    const foundUser = await this.userApi.findUser(user.userId);

    if (!foundUser) {
      await this.userApi.createUser(user);
    }
  }

  async cleanApplication(ownerId: string): Promise<string> {
    try {
      await Promise.race([
        await this.taskApi.deleteTasks(ownerId),
        await this.settingsApi.deleteSettings(ownerId),
      ]);

      return ownerId;
    } catch (e) {
      throw new AppError(
        UserServiceErrorCode.CLEAN_APPLICATION_ERROR,
        'service',
      );
    }
  }
}
