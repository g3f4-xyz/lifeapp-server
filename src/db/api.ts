import * as moment from 'moment';
import { FIELDS_TYPE, TASK_TYPE } from '../constants';
import { emitter } from './emitter';
import {
  IFieldValue,
  ISettings,
  ISettingsNotificationsGeneral,
  ISettingsNotificationsTypes,
  ISubscription,
  ISubscriptionData,
  ITask,
  ITaskField,
  ITaskType,
} from './interfaces';
import { SettingsModel } from './models/SettingsModel';
import { TaskModel } from './models/TaskModel';
import { TaskTypeModel } from './models/TaskTypeModel';

export const addSubscription = async (
  ownerId: string,
  subscriptionData: ISubscriptionData,
  userAgent: string,
  userDeviceType: string,
): Promise<void> => {
  try {
    // TODO nie sprawdzam istnienia ustawień podczas dodawania subskryci
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $push: {
        ['notifications.subscriptions']: { subscriptionData, userAgent, userDeviceType },
      },
    });
  } catch (error) {
    return error;
  }
};

export const addSettings = async (settings: ISettings): Promise<ISettings> => {
  try {
    const newSettings = new SettingsModel(settings);

    await newSettings.save();

    return newSettings.toJSON();
  } catch (error) {
    return error;
  }
};

export const addTask = async (task: ITask): Promise<ITask> => {
  try {
    const newTask = new TaskModel(task);

    await newTask.save();

    emitter.emit('task:added', newTask.toJSON());

    return newTask.toJSON();
  } catch (error) {
    return error;
  }
};

export const cleanApplication = async (ownerId: string): Promise<string> => {
  try {
    await deleteSettings(ownerId);
    await deleteTasks(ownerId);

    return ownerId;
  } catch (error) {
    return error;
  }
};

export const deleteSettings = async (ownerId: string): Promise<string> => {
  try {
    await SettingsModel.findOne({ ownerId }).remove();

    return ownerId;
  } catch (error) {
    return error;
  }
};

export const deleteTask = async (id: string): Promise<string> => {
  try {
    const task = await TaskModel.findById(id);

    await task.remove();

    return id;
  } catch (error) {
    return error;
  }
};

export const deleteTasks = async (ownerId: string): Promise<string> => {
  try {
    const tasks = await TaskModel.find({ ownerId });

    tasks.forEach((model) => model.remove());

    return ownerId;
  } catch (error) {
    return error;
  }
};

export const deleteSubscription = async (ownerId: string, subscriptionId: string): Promise<string> => {
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $pull: {
        ['notifications.subscriptions']: { subscriptionId },
      },
    });

    return ownerId;
  } catch (error) {
    return error;
  }
};

export const getSubscription = async (ownerId: string, subscriptionId: string): Promise<ISubscription> => {
  try {
    const settings = await SettingsModel.findOne({ ownerId });

    return settings.notifications.subscriptions.id(subscriptionId).toJSON();
  } catch (error) {
    return error;
  }
};

export const getEmptyTask = async (taskTypeId: TASK_TYPE, ownerId: string): Promise<ITask> => {
  try {
    const defaultValueByTaskTypeAndFieldId = {
      MEETING: {
        TITLE: {
          text: 'Spotkanie z ',
        },
      },
    };
    const defaultValueByFieldId = {
      STATUS: {
        id: 'TODO',
      },
    };
    const defaultValuesByTypeMap = {
      [FIELDS_TYPE.DATETIME_LOCAL]: {
        text: moment(new Date(Date.now()), 'YYYY-MM-DD HH:mm')
          .add(1, 'hours')
          .add(1, 'minute')
          .format()
          .slice(0, 16),
      },
      [FIELDS_TYPE.TEXT]: {
        text: '',
      },
      [FIELDS_TYPE.SELECT]: {
        id: '',
      },
      [FIELDS_TYPE.MULTIPLE_SELECT_WITH_PARENT]: {
        ids: [] as any,
      },
      [FIELDS_TYPE.SWITCH]: {
        bool: false,
      },
    };
    const mapFieldDefaultValue = (field: ITaskField) => {
      const { fieldId, type } = field;
      const defaultValue =
        defaultValueByTaskTypeAndFieldId[taskTypeId] && defaultValueByTaskTypeAndFieldId[taskTypeId][fieldId] ||
        defaultValueByFieldId[fieldId] ||
        defaultValuesByTypeMap[type];

      return {
        ...field,
        value: defaultValue,
      };
    };
    const taskType = await TaskTypeModel.findOne({ typeId: taskTypeId });
    const { parentID, fields } = taskType.toJSON();
    const parentFields = await getParentFieldsRecursive(parentID);

    const taskData = {
      ownerId,
      taskType: taskTypeId,
      fields: [...fields, ...parentFields.filter((item, idx, arr) => {
        const index = arr.findIndex((it) => {
          return it.fieldId === item.fieldId;
        });

        return index === idx;
      })].map(mapFieldDefaultValue),
    };

    const task = new TaskModel(taskData);

    await task.save();

    return task.toJSON();
  } catch (error) {
    return error;
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
    return error;
  }
};

export const getTask = async (id: string): Promise<ITask> => {
  try {
    return (await TaskModel.findById(id)).toJSON();
  } catch (error) {
    return error;
  }
};

export const getTaskList = async (ownerId: string): Promise<ITask[]> => {
  try {
    return await TaskModel.find({ ownerId }).sort({ _id : -1 });
  } catch (error) {
    return error;
  }
};

export const getTaskType = async (id: string): Promise<ITaskType> => {
  try {
    return (await TaskTypeModel.findById(id)).toJSON();
  } catch (error) {
    return error;
  }
};

const getParentFieldsRecursive = async (ids: string | string[]): Promise<ITaskField[]> => {
  if (!ids || (Array.isArray(ids) && ids.length === 0)) {
    return [];
  }

  if (Array.isArray(ids)) {
    const fieldsSet = await Promise.all(ids.map(getParentFieldsRecursive));

    return fieldsSet.reduce((acc, fields) => [...acc, ...fields], []);
  }

  const taskType = await TaskTypeModel.findOne({ typeId: ids });
  const { fields, parentID } = taskType.toJSON() || { fields: [] as ITaskField[], parentID: [] };

  return [
    ...fields,
    ...(await getParentFieldsRecursive(parentID)),
  ];
};

export const getTaskTypeList = async (): Promise<ITaskType[]> => {
  try {
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });

    return taskTypeList.filter((taskType) => taskType.parentID && taskType.name).map((model) => model.toJSON());
  } catch (error) {
    return error;
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
    return error;
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
    return error;
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
    return error;
  }
};

export const updateTaskField = async (
  taskId: string,
  fieldId: string,
  value: IFieldValue,
): Promise<any> => {
  try {
    const taskModel = await TaskModel.findById(taskId);

    taskModel.fields = taskModel.fields.map((field) => {
      if (field.fieldId === fieldId) {
        field.value = value;
      }

      return field;
    });

    await taskModel.save();

    return value;

  } catch (error) {
    return error;
  }
};
