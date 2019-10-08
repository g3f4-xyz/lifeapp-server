import { sendNotification } from 'web-push';
import { STATUSES, TASK_STATUS, TASK_TYPE } from '../constants';
import { SettingsApi } from '../db/api/settings/settingsApi';
import {
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
} from '../db/interfaces';

export default class SettingsService {
  constructor(readonly settingsApi: SettingsApi) {}

  async deleteUserSubscription(
    ownerId: string,
    subscriptionId: string,
  ): Promise<string> {
    return await this.settingsApi.deleteSubscription(ownerId, subscriptionId);
  }

  async getUserSettings(ownerId: string) {
    const settings = await this.settingsApi.getSettings(ownerId);

    if (settings) {
      return settings;
    }

    return await this.settingsApi.createSettings(ownerId);
  }

  async testSubscription(ownerId: string, subscriptionModelId: string) {
    try {
      const subscriptionData = await this.settingsApi.getSubscriptionData(
        ownerId,
        subscriptionModelId,
      );

      const payload = JSON.stringify({
        title: 'Welcome to LifeApp!',
        notification: {
          body:
            'This notification is test.' +
            ' It will be send always after entering page if notifications were allowed on this page.',
          icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
          },
          actions: [
            {
              action: 'test',
              title: 'Test',
              icon:
                'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
            },
            {
              action: 'close',
              title: 'Close notification',
              icon:
                'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
            },
          ],
        },
      });

      const { statusCode } = await sendNotification(subscriptionData, payload);

      return statusCode;
    } catch (error) {
      return error.statusCode ? error.statusCode : STATUSES.REQUEST_TIMEOUT;
    }
  }

  async updateTaskListTitleFilterSetting(ownerId: string, title: string) {
    return await this.settingsApi.saveTaskListTitleFilter(ownerId, title);
  }

  async updateTaskListTaskTypeFilterSetting(
    ownerId: string,
    taskType: TASK_TYPE[],
  ) {
    return await this.settingsApi.saveTaskListTaskTypeFilter(ownerId, taskType);
  }

  async updateTaskListStatusFilterSetting(
    ownerId: string,
    taskStatus: TASK_STATUS,
  ) {
    return await this.settingsApi.saveTaskListStatusFilter(ownerId, taskStatus);
  }

  async updateNotificationsGeneralSetting(
    ownerId: string,
    general: SettingsNotificationsGeneral,
  ) {
    return await this.settingsApi.saveNotificationsGeneral(ownerId, general);
  }

  async updateNotificationsTypesSetting(
    ownerId: string,
    types: SettingsNotificationsTypes,
  ) {
    return await this.settingsApi.saveNotificationsTypes(ownerId, types);
  }
}
