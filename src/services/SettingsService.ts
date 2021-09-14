import { TASK_STATUS, TaskTypeId } from '../constants';
import { SettingsApi } from '../db/api/settings/settingsApi';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
  Subscription,
  SubscriptionData,
} from '../db/interfaces';

export default class SettingsService {
  constructor(private readonly settingsApi: SettingsApi) {}

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
      await this.settingsApi.deleteSubscription(ownerId, oldSubscription.id);
    }

    const subscription: Subscription = {
      id: undefined,
      subscriptionData,
      userAgent,
      userDeviceType,
    };

    await this.settingsApi.addSubscription(ownerId, subscription);
  }

  async deleteSubscription(
    ownerId: string,
    subscriptionId: string,
  ): Promise<void> {
    await this.settingsApi.deleteSubscription(ownerId, subscriptionId);
  }

  async getSettings(ownerId: string): Promise<Settings> {
    const settings = await this.settingsApi.getSettings(ownerId);

    if (settings) {
      return settings;
    }

    return await this.settingsApi.createSettings(ownerId);
  }

  async updateTaskListTitleFilter(
    ownerId: string,
    title: string,
  ): Promise<string> {
    const updatedSettings = await this.settingsApi.saveTaskListTitleFilter(
      ownerId,
      title,
    );

    return updatedSettings.taskList.filters.title;
  }

  async updateTaskListTaskTypeFilter(
    ownerId: string,
    taskType: TaskTypeId[],
  ): Promise<TaskTypeId[]> {
    const updatedSettings = await this.settingsApi.saveTaskListTaskTypeFilter(
      ownerId,
      taskType,
    );

    return updatedSettings.taskList.filters.taskType;
  }

  async updateTaskListStatusFilter(
    ownerId: string,
    taskStatus: TASK_STATUS,
  ): Promise<TASK_STATUS> {
    const updatedSettings = await this.settingsApi.saveTaskListStatusFilter(
      ownerId,
      taskStatus,
    );

    return updatedSettings.taskList.filters.status;
  }

  async updateNotificationsGeneral(
    ownerId: string,
    general: SettingsNotificationsGeneral,
  ): Promise<SettingsNotificationsGeneral> {
    const updatedSettings = await this.settingsApi.saveNotificationsGeneral(
      ownerId,
      general,
    );

    return updatedSettings.notifications.general;
  }

  async updateNotificationsTypes(
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
