import { TASK_TYPE } from '../../constants';
import {
  Settings,
  SettingsNotificationsGeneral,
  SettingsNotificationsTypes,
  SubscriptionData,
  TaskType,
} from '../interfaces';
import { SettingsModel } from '../models/SettingsModel';
import { TaskTypeModel } from '../models/TaskTypeModel';
import { deleteTasks } from './taskApi';

export const addSubscription = async (
  ownerId: string,
  subscriptionData: SubscriptionData,
  userAgent: string,
  userDeviceType: string,
): Promise<void> => {
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
};
export const deleteSettings = async (ownerId: string): Promise<string> => {
  await SettingsModel.findOne({ ownerId }).remove();

  return ownerId;
};
export const cleanApplication = async (ownerId: string): Promise<string> => {
  await deleteSettings(ownerId);
  await deleteTasks(ownerId);

  return ownerId;
};
export const deleteSubscription = async (
  ownerId: string,
  subscriptionId: string,
): Promise<string> => {
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
};
export const getSubscriptionData = async (
  ownerId: string,
  subscriptionId: string,
): Promise<SubscriptionData> => {
  const settings = await SettingsModel.findOne({ ownerId });

  // @ts-ignore
  return settings.notifications.subscriptions.id(subscriptionId).toJSON()
    .subscriptionData;
};
export const getSettings = async (ownerId: string): Promise<Settings> => {
  const settingsModel = await SettingsModel.findOne({ ownerId });

  if (settingsModel) {
    return settingsModel.toJSON();
  }

  const newSettings = new SettingsModel();

  newSettings.ownerId = ownerId;
  newSettings.taskList.filters.taskType = Object.values(TASK_TYPE);

  return await newSettings.save();
};
export const getTaskType = async (id: string): Promise<TaskType> => {
  return (await TaskTypeModel.findById(id)).toJSON();
};
export const getTaskTypeList = async (): Promise<TaskType[]> => {
  const taskTypeList = await TaskTypeModel.find({
    parentTypeIds: { $exists: true },
  }).sort({ _id: -1 });

  return taskTypeList.map(model => model.toJSON());
};
export const saveNotificationsGeneralSetting = async (
  ownerId: string,
  general: SettingsNotificationsGeneral,
): Promise<SettingsNotificationsGeneral> => {
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
};
export const updateTaskListStatusFilterSetting = async (
  ownerId: string,
  status: string,
): Promise<string> => {
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
};
export const updateTaskListTitleFilterSetting = async (
  ownerId: string,
  title: string,
): Promise<string> => {
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
};
export const updateTaskListTaskTypeFilterSetting = async (
  ownerId: string,
  taskTypeFilter: TASK_TYPE[],
): Promise<TASK_TYPE[]> => {
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
};
export const saveNotificationsTypesSetting = async (
  ownerId: string,
  types: SettingsNotificationsTypes,
): Promise<SettingsNotificationsTypes> => {
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
};
