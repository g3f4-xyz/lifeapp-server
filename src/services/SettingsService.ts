import { TaskStatus, TaskTypeId } from '../constants';
import SettingsApi from '../db/api/settings/SettingsApi';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
  Subscription,
  SubscriptionData,
} from '../db/interfaces';

export default class SettingsService {
  constructor(private readonly settingsApi: SettingsApi) {}

  async getSettings(): Promise<Settings> {
    return await this.settingsApi.getSettings();
  }

  async updateTaskListTitleFilter(title: string): Promise<string> {
    return await this.settingsApi.saveTaskListTitleFilter(title);
  }

  async updateTaskListTaskTypeFilter(
    taskType: TaskTypeId[],
  ): Promise<TaskTypeId[]> {
    return await this.settingsApi.saveTaskListTaskTypeFilter(taskType);
  }

  async updateTaskListStatusFilter(
    taskStatus: TaskStatus[],
  ): Promise<TaskStatus[]> {
    const val = await this.settingsApi.saveTaskListStatusFilter(taskStatus);
    return await this.settingsApi.saveTaskListStatusFilter(taskStatus);
  }

  async updateNotificationsGeneral(
    general: SettingsNotificationsGeneral,
  ): Promise<SettingsNotificationsGeneral> {
    return await this.settingsApi.saveNotificationsGeneral(general);
  }

  async updateNotificationsTypes(
    types: SettingsNotificationsTypes,
  ): Promise<SettingsNotificationsTypes> {
    return await this.settingsApi.saveNotificationsTypes(types);
  }

  async addSubscription(
    subscriptionData: SubscriptionData,
    userAgent: string,
    userDeviceType: string,
  ): Promise<void> {
    const userSettings = await this.settingsApi.getSettings();

    const subscriptions = userSettings.notifications.subscriptions;
    const oldSubscription = subscriptions.find(
      subscription =>
        subscription.subscriptionData.endpoint === subscriptionData.endpoint,
    );

    if (oldSubscription) {
      await this.settingsApi.deleteSubscription(oldSubscription.id);
    }

    const subscription: Subscription = {
      id: undefined,
      subscriptionData,
      userAgent,
      userDeviceType,
    };

    await this.settingsApi.addSubscription(subscription);
  }

  async deleteSubscription(subscriptionId: string): Promise<void> {
    await this.settingsApi.deleteSubscription(subscriptionId);
  }
}
