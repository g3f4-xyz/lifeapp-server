const moment = require('moment');

const { FIELDS_TYPES } = require('../constants');
const SettingsModel = require('./models/SettingsModel');
const TaskModel = require('./models/TaskModel');
const TaskTypeModel = require('.//models/TaskTypeModel');
const emitter = require('./emitter');

const addSubscription = async (ownerId, subscription, userAgent, userDeviceType) => {
  console.log(['api:addSubscription'], { ownerId, subscription });
  try {
    return await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $push: {
        ['notifications.subscriptions']: { subscription, userAgent, userDeviceType },
      },
    },);
  }

  catch (error) {
    console.error(['api:addSubscription:error'], error);
    return error;
  }
};

const addSettings = async settings => {
  console.log(['api:addSettings'], { settings });
  try {
    const newSettings = new SettingsModel(settings);

    await newSettings.save();

    return newSettings;
  }

  catch (error) {
    console.error(['api:addSettings:error'], error);
    return error;
  }
};

const addTask = async task => {
  console.log(['api:addTask'], { task });
  try {
    const newTask = new TaskModel(task);

    await newTask.save();

    emitter.emit('task:added', newTask.toJSON());

    return newTask.toJSON();
  }

  catch (error) {
    console.error(['api:addTask:error'], error);
    return error;
  }
};

const addTaskType = async taskType => {
  console.log(['api:addTaskType'], taskType);
  try {
    const newTaskType = new TaskTypeModel(taskType);

    return await newTaskType.save().toJSON();
  }

  catch (error) {
    console.error(['api:addTaskType:error'], error);
    return error;
  }
};

const cleanApplication = async ownerId => {
  console.log(['api:cleanApplication:ownerId'], ownerId);
  try {
    await deleteSubscriptions(ownerId);
    await deleteSettings(ownerId);
    await deleteTasks({ ownerId });

    return ownerId;
  }

  catch (error) {
    console.error(['api:deleteSubscription:error'], error);
    return error;
  }
};

const deleteSettings = async ownerId => {
  console.log(['api:deleteSettings'], ownerId);
  try {
    await SettingsModel.findOne({ ownerId }).remove();

    return ownerId;
  }

  catch (error) {
    console.error(['api:deleteSettings:error'], error);
    return error;
  }
};

const deleteTask = async id => {
  console.log(['api:deleteTask'], id);
  try {
    const task = await getTask(id);

    await task.remove();

    return id;
  }

  catch (error) {
    console.error(['api:deleteTask:error'], error);
    return error;
  }
};


const deleteTasks = async ({ ownerId }) => {
  console.log(['api:deleteTasks'], ownerId);
  try {
    const tasks = await TaskModel.find({ ownerId });

    tasks.forEach(model => model.remove());

    return ownerId;
  }

  catch (error) {
    console.error(['api:deleteTasks:error'], error);
    return error;
  }
};

const deleteTaskType = async id => {
  console.log(['api:deleteTaskType'], id);
  try {
    const taskType = await getTaskType(id);

    await taskType.remove();

    return id;
  }

  catch (error) {
    console.error(['api:deleteTaskType:error'], error);
    return error;
  }
};

const deleteSubscription = async (ownerId, subscriptionId) => {
  console.log(['api:deleteSubscription'], { ownerId, subscriptionId });
  try {
    return await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $pull: {
        ['notifications.subscriptions']: { subscriptionId },
      },
    });
  }

  catch (error) {
    console.error(['api:deleteSubscription:error'], error);
    return error;
  }
};

const getSubscription = async (ownerId, subscriptionId) => {
  console.log(['api:getSubscription'], { ownerId, subscriptionId });
  try {
    const settings = await SettingsModel.findOne({ ownerId });

    return settings.notifications.subscriptions.id(subscriptionId);
  }

  catch (error) {
    console.error(['api:getSubscription:error'], error);
    return error;
  }
};

const getEmptyTask = async taskTypeId => {
  console.log(['api:getEmptyTask'], taskTypeId);
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
    [FIELDS_TYPES.DATETIME_LOCAL]: {
      text: moment(new Date(Date.now()), 'YYYY-MM-DD HH:mm').add(1, 'hours').add(1, 'minute').format().slice(0, 16),
    },
    [FIELDS_TYPES.TEXT]: {
      text: '',
    },
    [FIELDS_TYPES.SELECT]: {
      id: '',
    },
    [FIELDS_TYPES.SWITCH]: {
      bool: false,
    },
  };
  const mapFieldDefaultValue = field => {
    console.log(['mapFieldDefaultValue'], field);
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
  try {
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    const type = taskTypeList.find(type => type.get('typeId') === taskTypeId);
    const getParentFieldsRecursive = id => {
      if (!id) {
        return [];
      }

      if (Array.isArray(id)) {
        return id.map(getParentFieldsRecursive).reduce((acc, fields) => [...acc, ...fields], []);
      }

      const { fields, parentId } = taskTypeList.find(task => task.get('typeId') === id).toJSON();

      return [
        ...fields,
        ...getParentFieldsRecursive(parentId),
      ];
    };

    const { parentId, fields } = type.toJSON();
    const parentFields = getParentFieldsRecursive(parentId).filter((item, idx, arr) => {
      const index = arr.findIndex(it => {
        return it.fieldId === item.fieldId;
      });

      return index === idx
    });

    return {
      taskType: taskTypeId,
      fields: [...fields, ...parentFields].map(mapFieldDefaultValue),
    };
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};

// metoda api agregująca kolekcje.
// kolekcja subskrypcji jest oddzielona dla agendy.
// zamienić na powiązanie przez ownerId
const getSettings = async ownerId => {
  console.log(['api:getSettings'], ownerId);
  try {
    const settingsModel = await SettingsModel.findOne({ ownerId });
    console.log(['api:getSettings:settingsModel'], settingsModel);

    if (settingsModel) {
      return settingsModel;
    }

    const settings = {
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
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};

const getTask = async id => {
  console.log(['api:getTask'], id);
  try {
    return await TaskModel.findById(id);
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};

const getTaskList = async ({ ownerId }) => {
  console.log(['api:getTaskList'], ownerId);
  try {
    return await TaskModel.find({ ownerId }).sort({ _id : -1 });
  }

  catch (error) {
    console.error(['api:getTaskList:error'], error);
    return error;
  }
};

const getTaskType = async id => {
  console.log(['api:getTaskType'], id);
  try {
    return await TaskTypeModel.findById(id).toJSON();
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};

const getTaskTypeList = async ({ withParent = true } = {}) => {
  console.log(['api:getTaskTypeList']);
  try {
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    const getParentFieldsRecursive = id => {
      if (!id) {
        return [];
      }

      if (Array.isArray(id)) {
        return id.map(getParentFieldsRecursive).reduce((acc, fields) => [...acc, ...fields], []);
      }

      const { fields, parentId } = taskTypeList.find(task => task.get('typeId') === id).toJSON();

      return [
        ...fields,
        ...getParentFieldsRecursive(parentId),
      ];
    };

    return taskTypeList
      .filter(type => withParent ? type.get('parentId') && type.get('name') : true)
      .map(type => {
        const { parentId, fields } = type.toJSON();

        return {
          ...type.toJSON(),
          fields: [...fields, getParentFieldsRecursive(parentId)],
        };
      });
  }

  catch (error) {
    console.error(['api:getTaskTypeList:error'], error);
    return error;
  }
};

const saveNotificationsGeneralSetting = async (ownerId, general) => {
  console.log(['api:saveNotificationsGeneralSetting'], { ownerId, general });
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        notifications: { general },
      },
    });

    return general;
  }

  catch (error) {
    console.error(['api:saveNotificationsGeneralSetting:error'], error);
    return error;
  }
};

const saveNotificationsTypesSetting = async (ownerId, types) => {
  console.log(['api:saveNotificationsTypesSetting'], { ownerId, types });
  try {
    await SettingsModel.findOneAndUpdate({
      ownerId,
    }, {
      $set: {
        notifications: { types },
      },
    });

    return types;
  }

  catch (error) {
    console.error(['api:saveNotificationsTypesSetting:error'], error);
    return error;
  }
};

const saveTask = async ({ taskId, task, isNew = true }) => {
  console.log(['api:saveTask'], { taskId, task, isNew });
  try {
    const { fields } = task;
    const savedTask = await (isNew
      ? addTask(task)
      : TaskModel.findByIdAndUpdate(taskId, { fields }, { new: true })
    );

    return savedTask;
  }

  catch (error) {
    console.error(['api:saveTask:error'], error);
    return error;
  }
};

const saveTaskType = async ({ taskTypeId, taskType, isNew = true }) => {
  console.log(['api:saveTaskType'], { taskType, isNew });
  try {
    const { fields } = taskType;
    const savedTaskType = await (isNew
      ? addTask(taskType) :
      TaskTypeModel.findByIdAndUpdate(taskTypeId, { fields }, { new: true })
    );

    return savedTaskType.toJSON();
  }

  catch (error) {
    console.error(['api:saveTaskType:error'], error);
    return error;
  }
};

module.exports = {
  addSubscription,
  addSettings,
  addTask,
  addTaskType,
  cleanApplication,
  deleteSettings,
  deleteSubscription,
  deleteTask,
  deleteTaskType,
  getEmptyTask,
  getSettings,
  getSubscription,
  getTask,
  getTaskList,
  getTaskType,
  getTaskTypeList,
  saveNotificationsGeneralSetting,
  saveNotificationsTypesSetting,
  saveTask,
  saveTaskType,
};
