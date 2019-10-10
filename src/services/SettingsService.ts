import { sendNotification } from 'web-push';
import { STATUS, STATUSES, TASK_STATUS, TASK_TYPE } from '../constants';
import { SettingsApi } from '../db/api/settings/settingsApi';
import {
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
  Subscription,
  SubscriptionData,
} from '../db/interfaces';

export default class SettingsService {
  constructor(readonly settingsApi: SettingsApi) {}

  async addSubscription(
    ownerId: string,
    subscriptionData: SubscriptionData,
    userAgent: string,
    userDeviceType: string,
  ): Promise<void> {
    const userSettings = await this.settingsApi.getSettings(ownerId);

    const subscriptions = userSettings.notifications.subscriptions;
    const oldSubscription = subscriptions.find(
      subscription =>
        subscription.subscriptionData.endpoint === subscriptionData.endpoint,
    );

    if (oldSubscription) {
      await this.settingsApi.deleteSubscription(ownerId, oldSubscription._id);
    }

    const subscription: Subscription = {
      _id: undefined,
      subscriptionData,
      userAgent,
      userDeviceType,
    };

    await this.settingsApi.addSubscription(ownerId, subscription);
  }

  async deleteUserSubscription(
    ownerId: string,
    subscriptionId: string,
  ): Promise<void> {
    await this.settingsApi.deleteSubscription(ownerId, subscriptionId);
  }

  async getUserSettings(ownerId: string) {
    const settings = await this.settingsApi.getSettings(ownerId);

    if (settings) {
      return settings;
    }

    return await this.settingsApi.createSettings(ownerId);
  }

  private async getSubscriptionData(
    ownerId: string,
    subscriptionId: string,
  ): Promise<SubscriptionData | null> {
    const userSettings = await this.settingsApi.getSettings(ownerId);

    const subscription = userSettings.notifications.subscriptions.find(
      ({ _id }) => _id === subscriptionId,
    );

    return subscription ? subscription.subscriptionData : null;
  }

  async testSubscription(
    ownerId: string,
    subscriptionModelId: string,
  ): Promise<STATUS> {
    try {
      const subscriptionData = await this.getSubscriptionData(
        ownerId,
        subscriptionModelId,
      );

      if (!subscriptionData) {
        return STATUSES.NOT_FOUND;
      }

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

      return statusCode as STATUS;
    } catch (error) {
      return error.statusCode ? error.statusCode : STATUSES.REQUEST_TIMEOUT;
    }
  }

  async updateTaskListTitleFilterSetting(
    ownerId: string,
    title: string,
  ): Promise<string> {
    const updatedSettings = await this.settingsApi.saveTaskListTitleFilter(
      ownerId,
      title,
    );

    return updatedSettings.taskList.filters.title;
  }

  async updateTaskListTaskTypeFilterSetting(
    ownerId: string,
    taskType: TASK_TYPE[],
  ): Promise<TASK_TYPE[]> {
    const updatedSettings = await this.settingsApi.saveTaskListTaskTypeFilter(
      ownerId,
      taskType,
    );

    return updatedSettings.taskList.filters.taskType;
  }

  async updateTaskListStatusFilterSetting(
    ownerId: string,
    taskStatus: TASK_STATUS,
  ): Promise<TASK_STATUS> {
    const updatedSettings = await this.settingsApi.saveTaskListStatusFilter(
      ownerId,
      taskStatus,
    );

    return updatedSettings.taskList.filters.status;
  }

  async updateNotificationsGeneralSetting(
    ownerId: string,
    general: SettingsNotificationsGeneral,
  ): Promise<SettingsNotificationsGeneral> {
    const updatedSettings = await this.settingsApi.saveNotificationsGeneral(
      ownerId,
      general,
    );

    return updatedSettings.notifications.general;
  }

  async updateNotificationsTypesSetting(
    ownerId: string,
    types: SettingsNotificationsTypes,
  ): Promise<SettingsNotificationsTypes> {
    const updatedSettings = await this.settingsApi.saveNotificationsTypes(
      ownerId,
      types,
    );

    return updatedSettings.notifications.types;
  }
}
