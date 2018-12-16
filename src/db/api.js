const moment = require('moment');
const { FIELDS_TYPES } = require('../constants');
const SettingsModel = require('./models/SettingsModel');
const SubscriptionModel = require('.//models/SubscriptionModel');
const TaskModel = require('.//models/TaskModel');
const TaskTypeModel = require('.//models/TaskTypeModel');
const emitter = require('./emitter');

const addSubscription = async (ownerId, subscription, userAgent, userDeviceType) => {
  console.log(['api:addSubscription'], { ownerId, subscription });
  try {
    const previousSubscription = await SubscriptionModel.findOne({
      subscription,
      userAgent,
      userDeviceType,
    });

    if (previousSubscription) {
      return previousSubscription;
    }

    const newSubscription = new SubscriptionModel({
      ownerId,
      subscription,
      userAgent,
      userDeviceType,
    });

    return await newSubscription.save();
  }

  catch (error) {
    console.error(['api:addTask:error'], error);
    return error;
  }
};
const addSettings = async settings => {
  console.log(['api:addSettings'], { settings });
  try {
    const newSettings = new SettingsModel(settings);

    await newSettings.save();

    return newSettings.toJSON();
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

const deleteSettings = async ownerId => {
  console.log(['api:deleteTask'], ownerId);
  try {
    const settings = await getSettings(ownerId);

    await settings.remove();

    return ownerId;
  }

  catch (error) {
    console.error(['api:deleteTask:error'], error);
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
const deleteSubscription = async subscriptionId => {
  console.log(['api:deleteSubscription:subscriptionId'], subscriptionId);
  try {
    const subscription = await SubscriptionModel.findById(subscriptionId);
    console.log(['api:deleteSubscription:subscription'], subscription);

    await subscription.remove();

    return subscriptionId;
  }

  catch (error) {
    console.error(['api:deleteSubscription:error'], error);
    return error;
  }
};
const deleteSubscriptions = async ownerId => {
  console.log(['api:deleteSubscription:ownerId'], ownerId);
  try {
    const subscriptions = await getSubscriptions(ownerId);
    console.log(['api:deleteSubscriptions:user'], subscriptions);

    await subscriptions.forEach(async model => await model.remove());

    return ownerId;
  }

  catch (error) {
    console.error(['api:deleteSubscription:error'], error);
    return error;
  }
};
const getSubscription = async id => {
  console.log(['api:getSubscription:id'], id);
  try {
    const subscription = await SubscriptionModel.findById(id);
    console.log(['api:getSubscription:subscription'], subscription);

    return subscription.toJSON();
  }

  catch (error) {
    console.error(['api:getSubscription:error'], error);
    return error;
  }
};
const getSubscriptions = async ownerId => {
  console.log(['api:getSubscriptions:ownerId'], ownerId);
  try {
    const subscriptions = await SubscriptionModel.find({ ownerId });
    console.log(['api:getSubscription:subscriptions'], subscriptions);

    return subscriptions ? subscriptions.map(model => model.toJSON()) : [];
  }

  catch (error) {
    console.error(['api:getSubscriptions:error'], error);
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
    const settings = await SettingsModel.findOne({ ownerId });
    const subscriptions = await getSubscriptions(ownerId);
    console.log(['api:getSettings:settings'], settings);
    console.log(['api:getSettings:subscriptions'], subscriptions);

    const result = settings ? settings.toJSON() : (
      {
        ownerId,
        authentication: {
          provider: null,
        },
        notifications: {
          show: null,
          daily: {
            events: null,
            meetings: null,
            routines: null,
            todos: null,
          },
          single: {
            events: null,
            meetings: null,
            routines: null,
            todos: null,
          },
          subscriptions: [],
        },
      }
    );

    return {
      ...result,
      notifications: {
        ...result.notifications,
        subscriptions,
      },
    };
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
      ]
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

const saveSettings = async (settingsId, { settings, ownerId, isNew = true }) => {
  console.log(['api:saveSettings'], { ownerId, settingsId, settings, isNew });
  try {
    if (isNew || !Boolean(settingsId)) {
      return addSettings({
        ...settings,
        ownerId,
      });
    }
    const savedSettings = await SettingsModel.findByIdAndUpdate(
      settingsId,
      settings,
      { new: true }
    );

    return savedSettings.toJSON();
  }

  catch (error) {
    console.error(['api:saveSettings:error'], error);
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

    return savedTask.toJSON();
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
  deleteSettings,
  deleteSubscription,
  deleteSubscriptions,
  deleteTask,
  deleteTaskType,
  getEmptyTask,
  getSettings,
  getSubscription,
  getSubscriptions,
  getTask,
  getTaskList,
  getTaskType,
  getTaskTypeList,
  saveSettings,
  saveTask,
  saveTaskType,
};
