// import * as moment from 'moment-timezone';
import { Moment } from 'moment-timezone';
import { FIELD_ID, FIELD_TYPE, TASK_TYPE } from '../constants';
import {
  // IField,
  IFieldValue,
  ISettings,
  ISettingsNotificationsGeneral,
  ISettingsNotificationsTypes,
  ISubscription,
  ISubscriptionData,
  ITask,
  ITaskType,
} from './interfaces';
import { FieldConfigModel, IFieldDocument } from './models/FieldConfigModel';
import { SettingsModel } from './models/SettingsModel';
import { TaskModel } from './models/TaskModel';
import { TaskTypeModel } from './models/TaskTypeModel';

// const defaultValuesByFieldIdMap: { [key: string]: any } = {
//   [FIELD_ID.STATUS]: () => ({
//     id: 'TODO',
//   }),
//   [FIELD_ID.DATE_TIME]: () => ({
//     text: moment(Date.now()).format('YYYY-MM-DDThh:mm'),
//   }),
// };
//
// export const mapFieldDefaultValue = (field: IField): IField => {
//   const { fieldId } = field;
//   const defaultValueByFieldId = defaultValuesByFieldIdMap[fieldId];
//
//   return defaultValueByFieldId ? {
//     ...field,
//     value: defaultValueByFieldId(),
//   } : field;
// };

export const getFieldConfig = async (fieldId: FIELD_ID): Promise<Partial<IFieldDocument>> => {
  try {
    const fieldConfig = await FieldConfigModel.findOne({ fieldId });

    const { fieldType } = fieldConfig.toJSON();

    return { fieldType };
  } catch (error) {
    throw error;
  }
};

export const addSubscription = async (
  ownerId: string,
  subscriptionData: ISubscriptionData,
  userAgent: string,
  userDeviceType: string,
): Promise<void> => {
  try {
    const userSettings = await SettingsModel.findOne({
      ownerId,
    });

    if (!userSettings) {
      console.error('no user settings while trying to add subscription.');
      return;
    }

    const subscriptions = userSettings.notifications.subscriptions;
    const oldSubscription = subscriptions.find(
      (subscription: ISubscription) => subscription.subscriptionData.endpoint === subscriptionData.endpoint,
    );

    if (!oldSubscription) {
      userSettings.notifications.subscriptions.push({ subscriptionData, userAgent, userDeviceType });

      await userSettings.save();
    }
  } catch (error) {
    throw error;
  }
};

export const addSettings = async (settings: ISettings): Promise<ISettings> => {
  try {
    const newSettings = new SettingsModel(settings);

    console.log(['addSettings'], newSettings)

    await newSettings.save();

    return newSettings.toJSON();
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task: ITask): Promise<ITask> => {
  try {
    const newTask = new TaskModel(task);

    await newTask.save();

    return newTask.toJSON();
  } catch (error) {
    throw error;
  }
};

export const cleanApplication = async (ownerId: string): Promise<string> => {
  try {
    await deleteSettings(ownerId);
    await deleteTasks(ownerId);

    return ownerId;
  } catch (error) {
    throw error;
  }
};

export const deleteSettings = async (ownerId: string): Promise<string> => {
  try {
    await SettingsModel.findOne({ ownerId }).remove();

    return ownerId;
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<string> => {
  try {
    const task = await TaskModel.findById(id);

    await task.remove();

    return id;
  } catch (error) {
    throw error;
  }
};

export const deleteTasks = async (ownerId: string): Promise<string> => {
  try {
    const tasks = await TaskModel.find({ ownerId });

    tasks.forEach((model) => model.remove());

    return ownerId;
  } catch (error) {
    throw error;
  }
};

export const deleteUntouchedTasks = async (): Promise<void> => {
  try {
    const tasks = await TaskModel.find({ updatedAt: { $exists: false } });

    tasks.forEach((model) => model.remove());
  } catch (error) {
    throw error;
  }
};

export const deleteSubscription = async (ownerId: string, subscriptionId: string): Promise<string> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $pull: {
        ['notifications.subscriptions']: { _id: subscriptionId },
      },
    });

    return ownerId;
  } catch (error) {
    throw error;
  }
};

export const getSubscriptionData = async (ownerId: string, subscriptionId: string): Promise<ISubscriptionData> => {
  try {
    const settings = await SettingsModel.findOne({ ownerId });

    // @ts-ignore
    return settings.notifications.subscriptions.id(subscriptionId).toJSON().subscriptionData;
  } catch (error) {
    throw error;
  }
};

export const getTasksWithActiveNotificationInPeriod = async (
  taskType: TASK_TYPE,
  startDate: Moment,
  endDate: Moment,
): Promise<ITask[]> => {
  try {
    const routines = await TaskModel.find({
      taskType,
      notificationAt: {
        $gte: startDate.toDate(),
        $lte: endDate.toDate(),
      },
      fields: {
        $elemMatch: {
          $and: [
            { fieldId: 'NOTIFICATIONS'},
            { fieldType: 'NESTED' },
            { value: { $exists: true } },
            { ['value.ownValue']: { $exists: true } },
            { ['value.ownValue.enabled']: { $exists: true } },
            { ['value.ownValue.enabled']: true },
          ],
        },
      },
    });

    return routines.map(doc => doc.toJSON());
  } catch (e) {
    throw new Error(`api:error getting tasks with active notifications for type ${taskType} | ${e}`);
  }
};

export const getTasksWithActiveNotification = async (taskType: TASK_TYPE): Promise<ITask[]> => {
  try {
    const routines = await TaskModel.find({
      taskType,
      $and: [
        ...[
          {
            fields: {
              $elemMatch: {
                $and: [
                  { fieldId: 'NOTIFICATIONS'},
                  { fieldType: 'NESTED' },
                  { value: { $exists: true } },
                  { ['value.ownValue']: { $exists: true } },
                  { ['value.ownValue.enabled']: { $exists: true } },
                  { ['value.ownValue.enabled']: true },
                ],
              },
            },
          },
        ],
        ...(taskType === TASK_TYPE.ROUTINE ? [
          {
            fields: {
              $elemMatch: {
                $and: [
                  { fieldId: FIELD_ID.ACTIVE },
                  { fieldType: FIELD_TYPE.SWITCH },
                  { value: { $exists: true } },
                  { ['value.enabled']: { $exists: true } },
                  { ['value.enabled']: true },
                ],
              },
            },
          },
        ] : []),
      ],
    });

    return routines.map(doc => doc.toJSON());
  } catch (e) {
    throw new Error(`api:error getting tasks with active notifications for type ${taskType} | ${e}`);
  }
};

export const disableTaskNotification = async (taskId: any): Promise<void> => {
  try {
    await TaskModel.findOneAndUpdate({
      _id: taskId,
      fields: {
        $elemMatch: {
          $and: [
            { fieldId: 'NOTIFICATIONS' },
            { fieldType: 'NESTED' },
            { value: { $exists: true } },
            { ['value.ownValue']: { $exists: true } },
            { ['value.ownValue.enabled']: { $exists: true } },
            { ['value.ownValue.enabled']: true },
          ],
        },
      },
    }, {
      $set: {
        ['fields.$.value.ownValue.enabled']: false,
        ['fields.$.meta.ownMeta.disabled']: true,
      },
    });
  } catch (e) {
    throw new Error(`api:error setting task non active notifications for task with id ${taskId} | ${e}`);
  }
};

export const updateNotificationAt = async (taskId: string, notificationAt: Date, lastNotificationAt: Date): Promise<void> => {
  console.log(['updateNotificationAt'], { taskId, notificationAt, lastNotificationAt })
  try {
    await TaskModel.findByIdAndUpdate(taskId, {
      $set: {
        notificationAt,
        lastNotificationAt,
      },
    });
  } catch (e) {
    throw new Error(`api:error updating task notificationAt for task with id ${taskId} | ${e}`);
  }
};

export const getEmptyTask = async (taskTypeId: TASK_TYPE, ownerId: string): Promise<ITask> => {
  try {
    const taskType = await TaskTypeModel.findOne({ typeId: taskTypeId });
    const { parentTypeIds, fieldsIds } = taskType.toJSON();
    const parentFieldsIds = await getParentFieldsIds(parentTypeIds);
    const filteredFieldsIds = [...fieldsIds, ...parentFieldsIds]
      .filter((value, index, arr) => arr.indexOf(value) === index);
    const fields = await Promise.all(filteredFieldsIds.map(getFieldConfig));
    const taskData = {
      ownerId,
      taskType: taskTypeId,
      fields,
    };
    console.log(['taskData'], taskData)
    const task = new TaskModel(taskData);
    console.log(['task'], task)

    await task.save();

    return task.toJSON();
  } catch (error) {
    throw error;
  }
};

export const getSettings = async (ownerId: string): Promise<ISettings> => {
  try {
    const settingsModel = await SettingsModel.findOne({ ownerId });

    if (settingsModel) {
      return settingsModel.toJSON();
    }

    const newSettings = new SettingsModel();

    newSettings.ownerId = ownerId;
    newSettings.taskList.filters.taskType = Object.values(TASK_TYPE);

    return await newSettings.save();
  } catch (error) {
    throw error;
  }
};

export const getTask = async (id: string): Promise<ITask> => {
  try {

    const task = await TaskModel.findById(id);

    return task.toJSON();
  } catch (error) {
    throw error;
  }
};

export const getTaskList = async (ownerId: string): Promise<ITask[]> => {
  const { taskList } = await getSettings(ownerId);
  const { filters } = taskList;

  try {
    return (await TaskModel
      .find({
        ownerId,
        updatedAt: { $exists: true },
        taskType: { $in : filters.taskType },
        $and: [
          ...[
            {
              fields: {
                $elemMatch: {
                  $and: [
                    { fieldId: FIELD_ID.TITLE },
                    { fieldType: FIELD_TYPE.TEXT },
                    { value: { $exists: true } },
                    { ['value.text']: { $exists: true } },
                    { ['value.text']: { $regex: new RegExp(filters.title), $options: 'i' } },
                  ],
                },
              },
            },
          ],
          ...(filters.status ? [
            {
              fields: {
                $elemMatch: {
                  $and: [
                    { fieldId: FIELD_ID.STATUS },
                    { fieldType: FIELD_TYPE.CHOICE },
                    { value: { $exists: true } },
                    { ['value.id']: { $exists: true } },
                    { ['value.id']: filters.status },
                  ],
                },
              },
            },
          ] : []),
        ],
      })
      .sort({ _id : -1 }))
      .map((doc) => doc.toJSON());
  } catch (error) {
    throw error;
  }
};

export const getTaskType = async (id: string): Promise<ITaskType> => {
  try {
    return (await TaskTypeModel.findById(id)).toJSON();
  } catch (error) {
    throw error;
  }
};

const getParentFieldsIds = async (
  parentTypeIds: ITaskType['parentTypeIds'],
): Promise<string[]> => {
  if (parentTypeIds.length === 0) {
    return [];
  }

  const fieldsIdsSet = await Promise.all(parentTypeIds.map(async (typeId) => {
    const parentType = await TaskTypeModel.findOne({ typeId });
    const parentFieldsIds = await getParentFieldsIds(parentType.parentTypeIds);

    return [
      ...parentType.fieldsIds,
      ...parentFieldsIds,
    ];
  }));

  return fieldsIdsSet.reduce((acc, arr) => [...acc, ...arr], []);
};

export const getTaskTypeList = async (): Promise<ITaskType[]> => {
  try {
    const taskTypeList = await TaskTypeModel.find({
      parentTypeIds: { $exists: true },
    }).sort({ _id : -1 });

    return taskTypeList.map((model) => model.toJSON());
  } catch (error) {
    throw error;
  }
};

export const saveNotificationsGeneralSetting = async (
  ownerId: string,
  general: ISettingsNotificationsGeneral,
): Promise<ISettingsNotificationsGeneral> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        ['notifications.general']: general,
      },
    });

    return general;
  } catch (error) {
    throw error;
  }
};

export const updateTaskListStatusFilterSetting = async (
  ownerId: string,
  status: string,
): Promise<string> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        ['taskList.filters.status']: status,
      },
    });

    return status;
  } catch (error) {
    throw error;
  }
};
export const updateTaskListTitleFilterSetting = async (
  ownerId: string,
  title: string,
): Promise<string> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        ['taskList.filters.title']: title,
      },
    });

    return title;
  } catch (error) {
    throw error;
  }
};

export const updateTaskListTaskTypeFilterSetting = async (
  ownerId: string,
  taskTypeFilter: TASK_TYPE[],
): Promise<TASK_TYPE[]> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        ['taskList.filters.taskType']: taskTypeFilter,
      },
    });

    return taskTypeFilter;
  } catch (error) {
    throw error;
  }
};

export const saveNotificationsTypesSetting = async (
  ownerId: string,
  types: ISettingsNotificationsTypes,
  ): Promise<ISettingsNotificationsTypes> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        ['notifications.types']: types,
      },
    });

    return types;
  } catch (error) {
    throw error;
  }
};

export const saveTask = async (
  { taskId, task, isNew = true }: { taskId: string, task: ITask, isNew: boolean },
): Promise<ITask> => {
  try {
    if (isNew) {
      return await addTask(task);
    }

    await TaskModel.findByIdAndUpdate(taskId, { fields: task.fields });

    return await getTask(taskId);
  } catch (error) {
    throw error;
  }
};

export const updateTaskField = async (
  taskId: string,
  fieldId: FIELD_ID,
  value: IFieldValue,
): Promise<IFieldValue> => {
  try {
    // tutaj wiem jakie pole się zmienia. brakuje jeszcze tylko taskType
    await TaskModel.findOneAndUpdate({
      _id: taskId,
      ['fields.fieldId']: fieldId,
    }, {
      $set: {
        lastChangedFieldId: fieldId,
        ['fields.$.value']: value,
      },
    });

    return value;

  } catch (error) {
    throw error;
  }
};
