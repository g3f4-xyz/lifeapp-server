import { MongoError } from 'mongodb';
import { MONGO_ERROR, TASK_STATUS, TASK_TYPE } from '../../../constants';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
  SubscriptionData,
} from '../../interfaces';
import { SettingsModel } from '../../models/settings/SettingsModel';
import ApiError from '../ApiError';

export enum SettingsApiErrorCode {
  DUPLICATE_SETTINGS = 'DUPLICATE_SETTINGS',
}

const settingsApi = {
  async addSubscription(
    ownerId: string,
    subscriptionData: SubscriptionData,
    userAgent: string,
    userDeviceType: string,
  ): Promise<void> {
    const userSettings = await SettingsModel.findOne({
      ownerId,
    });

    if (!userSettings) {
      console.error('no user settings while trying to add subscription.');
      return;
    }

    const subscriptions = userSettings.notifications.subscriptions;
    const oldSubscription = subscriptions.find(
      subscription =>
        subscription.subscriptionData.endpoint === subscriptionData.endpoint,
    );

    if (!oldSubscription) {
      userSettings.notifications.subscriptions.push({
        subscriptionData,
        userAgent,
        userDeviceType,
      });

      await userSettings.save();
    }
  },
  async deleteSubscription(
    ownerId: string,
    subscriptionId: string,
  ): Promise<string> {
    await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $pull: {
          ['notifications.subscriptions']: { _id: subscriptionId },
        },
      },
    );

    return ownerId;
  },
  async getSubscriptionData(
    ownerId: string,
    subscriptionId: string,
  ): Promise<SubscriptionData> {
    const settings = await SettingsModel.findOne({ ownerId });

    // @ts-ignore
    return settings.notifications.subscriptions.id(subscriptionId).toJSON()
      .subscriptionData;
  },
  async saveNotificationsGeneral(
    ownerId: string,
    general: SettingsNotificationsGeneral,
  ): Promise<SettingsNotificationsGeneral> {
    await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['notifications.general']: general,
        },
      },
    );

    return general;
  },
  async saveTaskListStatusFilter(
    ownerId: string,
    status: TASK_STATUS,
  ): Promise<string> {
    await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['taskList.filters.status']: status,
        },
      },
    );

    return status;
  },
  async saveTaskListTitleFilter(
    ownerId: string,
    title: string,
  ): Promise<string> {
    await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['taskList.filters.title']: title,
        },
      },
    );

    return title;
  },
  async saveNotificationsTypes(
    ownerId: string,
    types: SettingsNotificationsTypes,
  ): Promise<SettingsNotificationsTypes> {
    await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['notifications.types']: types,
        },
      },
    );

    return types;
  },
  async saveTaskListTaskTypeFilter(
    ownerId: string,
    taskTypeFilter: TASK_TYPE[],
  ): Promise<TASK_TYPE[]> {
    await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['taskList.filters.taskType']: taskTypeFilter,
        },
      },
    );

    return taskTypeFilter;
  },
  async getSettings(ownerId: string): Promise<Settings | null> {
    const settingsModel = await SettingsModel.findOne({ ownerId });

    if (settingsModel) {
      return settingsModel.toJSON();
    }

    return null;
  },
  async createSettings(ownerId: string): Promise<Settings> {
    try {
      const newSettings = await SettingsModel.create({ ownerId });

      await newSettings.save();

      return newSettings.toJSON();
    } catch (error) {
      if (error instanceof MongoError) {
        if (error.code === MONGO_ERROR.DUPLICATE_KEY) {
          throw new ApiError(SettingsApiErrorCode.DUPLICATE_SETTINGS);
        }
      }
    }
  },
  async deleteSettings(ownerId: string): Promise<string> {
    await SettingsModel.findOne({ ownerId }).remove();

    return ownerId;
  },
};

export default settingsApi;

export type SettingsApi = typeof settingsApi;
