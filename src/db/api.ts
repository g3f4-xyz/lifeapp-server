import { FIELD_TYPE, FIELD_TYPE_VALUE_MAP, TASK_TYPE } from '../constants';
import {
  IField,
  IFieldValue,
  ISettings,
  ISettingsNotificationsGeneral,
  ISettingsNotificationsTypes,
  ISubscription,
  ISubscriptionData,
  ITask,
  ITaskType,
} from './interfaces';
import { FieldModel, IFieldDocument } from './models/FieldSchema';
import { SettingsModel } from './models/SettingsModel';
import { TaskModel } from './models/TaskModel';
import { TaskTypeModel } from './models/TaskTypeModel';

const defaultValuesByTypeMap: FIELD_TYPE_VALUE_MAP<{ [key: string]: any }> = {
  [FIELD_TYPE.CHOICE]: {
    id: '',
  },
  [FIELD_TYPE.SWITCH]: {
    enabled: false,
  },
  [FIELD_TYPE.TEXT]: {
    text: '',
  },
  [FIELD_TYPE.NESTED]: {
    ownValue: null,
    childrenValue: null,
  },
};

export const mapFieldDefaultValue = (field: IField): IField => {
  const { fieldType } = field;

  return {
    ...field,
    value: defaultValuesByTypeMap[fieldType],
  };
};

export const getFieldByFieldId = async (fieldId: string): Promise<IFieldDocument> => {
  try {
    const fieldDocument = await FieldModel.findOne({ fieldId });

    return fieldDocument.toJSON();
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
    // TODO nie sprawdzam istnienia ustawień podczas dodawania subskrycji
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $push: {
        ['notifications.subscriptions']: { subscriptionData, userAgent, userDeviceType },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const addSettings = async (settings: ISettings): Promise<ISettings> => {
  try {
    const newSettings = new SettingsModel(settings);

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

    const taskData = newTask.toJSON();

    return taskData;
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

export const getSubscription = async (ownerId: string, subscriptionId: string): Promise<ISubscription> => {
  try {
    const settings = await SettingsModel.findOne({ ownerId });

    return settings.notifications.subscriptions.id(subscriptionId).toJSON();
  } catch (error) {
    throw error;
  }
};

export const getTasksWithActiveNotification = async (taskType: TASK_TYPE): Promise<ITask[]> => {
  try {
    const routines = await TaskModel.find({
      taskType,
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

export const getEmptyTask = async (taskTypeId: TASK_TYPE, ownerId: string): Promise<ITask> => {
  try {
    const taskType = await TaskTypeModel.findOne({ typeId: taskTypeId });
    const { parentTypeIds, fieldsIds } = taskType.toJSON();
    const parentFieldsIds = await getParentFieldsIds(parentTypeIds);
    const filteredFieldsIds = [...fieldsIds, ...parentFieldsIds]
      .filter((value, index, arr) => arr.indexOf(value) === index);
    const fields = await Promise.all(filteredFieldsIds.map(getFieldByFieldId));
    const taskData = {
      ownerId,
      taskType: taskTypeId,
      fields: fields.map(mapFieldDefaultValue),
    };
    const task = new TaskModel(taskData);

    await task.save();

    return task.toJSON();
  } catch (error) {
    throw error;
  }
};

// metoda api agregująca kolekcje.
// kolekcja subskrypcji jest oddzielona dla agendy.
// zamienić na powiązanie przez ownerId
export const getSettings = async (ownerId: string): Promise<ISettings> => {
  try {
    const settingsModel = await SettingsModel.findOne({ ownerId });

    if (settingsModel) {
      return settingsModel.toJSON();
    }

    const settings: ISettings = {
      ownerId,
      notifications: {
        general: {
          show: true,
          vibrate: false,
        },
        types: {
          events: true,
          meetings: true,
          routines: true,
          todos: true,
        },
        subscriptions: [],
      },
    };

    return await addSettings(settings);
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
  try {
    return (await TaskModel.find({ ownerId }).sort({ _id : -1 })).map((doc) => doc.toJSON());
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
  fieldId: string,
  value: IFieldValue,
): Promise<IFieldValue> => {
  try {
    await TaskModel.findOneAndUpdate({
      _id: taskId,
      ['fields.fieldId']: fieldId,
    }, {
      $set: {
        ['fields.$.value']: value,
      },
    });

    return value;

  } catch (error) {
    throw error;
  }
};
