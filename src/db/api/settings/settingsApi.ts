import { MongoError } from 'mongodb';
import { MONGO_ERROR, TASK_STATUS, TASK_TYPE } from '../../../constants';
import AppError from '../../../utils/AppError';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
  Subscription,
} from '../../interfaces';
import { SettingsModel } from '../../models/settings/SettingsModel';

export enum SettingsApiErrorCode {
  DUPLICATE_SETTINGS = 'DUPLICATE_SETTINGS',
  NO_USER_SETTINGS = 'NO_USER_SETTINGS',
}

const settingsApi = {
  async createSettings(ownerId: string): Promise<Settings> {
    try {
      const newSettings = await SettingsModel.create({ ownerId });

      await newSettings.save();

      return newSettings.toJSON();
    } catch (error) {
      if (error instanceof MongoError) {
        if (error.code === MONGO_ERROR.DUPLICATE_KEY) {
          throw new AppError(SettingsApiErrorCode.DUPLICATE_SETTINGS, 'api');
        }
      }
    }
  },
  async deleteSettings(ownerId: string): Promise<string> {
    await SettingsModel.findOne({ ownerId }).remove();

    return ownerId;
  },
  async getSettings(ownerId: string): Promise<Settings | null> {
    const settingsModel = await SettingsModel.findOne({ ownerId });

    if (settingsModel) {
      return settingsModel.toJSON();
    }

    return null;
  },
  //  async saveSettings(ownerId: string, settings: Settings): Promise<Settings> {
  //    const settingsDoc = await SettingsModel.findOneAndUpdate(
  //      { ownerId },
  //      settings,
  //      { new: true },
  //    );
  //
  //    return settingsDoc.toJSON();
  //  },

  async addSubscription(
    ownerId: string,
    subscription: Subscription,
  ): Promise<Settings> {
    const settingsDocument = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $push: {
          ['notifications.subscriptions']: subscription,
        },
      },
      { new: true },
    );

    return settingsDocument.toJSON();
  },
  async deleteSubscription(
    ownerId: string,
    subscriptionId: string,
  ): Promise<Settings> {
    const settingsDocument = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $pull: {
          ['notifications.subscriptions']: { _id: subscriptionId },
        },
      },
      { new: true },
    );

    if (!settingsDocument) {
      throw new AppError(SettingsApiErrorCode.NO_USER_SETTINGS, 'api');
    }

    return settingsDocument.toJSON();
  },

  async saveNotificationsGeneral(
    ownerId: string,
    general: SettingsNotificationsGeneral,
  ): Promise<Settings> {
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['notifications.general']: general,
        },
      },
      { new: true },
    );

    return updatedSettings.toJSON();
  },
  async saveNotificationsTypes(
    ownerId: string,
    types: SettingsNotificationsTypes,
  ): Promise<Settings> {
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['notifications.types']: types,
        },
      },
      { new: true },
    );

    return updatedSettings.toJSON();
  },
  async saveTaskListStatusFilter(
    ownerId: string,
    status: TASK_STATUS,
  ): Promise<Settings> {
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['taskList.filters.status']: status,
        },
      },
      { new: true },
    );

    return updatedSettings.toJSON();
  },
  async saveTaskListTitleFilter(
    ownerId: string,
    title: string,
  ): Promise<Settings> {
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['taskList.filters.title']: title,
        },
      },
      { new: true },
    );

    return updatedSettings.toJSON();
  },
  async saveTaskListTaskTypeFilter(
    ownerId: string,
    taskTypeFilter: TASK_TYPE[],
  ): Promise<Settings> {
    const updatedSettings = await SettingsModel.findOneAndUpdate(
      {
        ownerId,
      },
      {
        $set: {
          ['taskList.filters.taskType']: taskTypeFilter,
        },
      },
      { new: true },
    );

    return updatedSettings.toJSON();
  },
};

export default settingsApi;

export type SettingsApi = typeof settingsApi;
