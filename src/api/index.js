const moment = require('moment');
const SubscriptionModel = require('.//models/SubscriptionModel');
const TaskModel = require('.//models/TaskModel');
const TaskTypeModel = require('.//models/TaskTypeModel');
const emitter = require('./emitter');

const addSubscription = async (ownerId, subscription) => {
  console.log(['api:addSubscription'], { ownerId, subscription });
  try {
    const previousSubscription = await SubscriptionModel.findOne({ subscription });

    if (previousSubscription) {
      return previousSubscription;
    }

    const newSubscription = new SubscriptionModel({ ownerId, subscription });

    return await newSubscription.save();
  }

  catch (error) {
    console.error(['api:addTask:error'], error);
    return error;
  }
};
const addTask = async task => {
  console.log(['api:addTask'], { task });
  try {
    const newTask = new TaskModel(task);



    await newTask.save();

    emitter.emit('task:added', newTask);

    return newTask;
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

    return await newTaskType.save();
  }

  catch (error) {
    console.error(['api:addTaskType:error'], error);
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
const deleteSubscription = async id => {
  console.log(['api:deleteSubscription:id'], id);
  try {
    const subscription = await getSubscription(id);
    console.log(['api:deleteSubscription:user'], subscription);

    await subscription.remove();

    return id;
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

    return subscription;
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

    return subscriptions;
  }

  catch (error) {
    console.error(['api:getSubscriptions:error'], error);
    return error;
  }
};

const FIELDS_TYPES = {
  TEXT: 'text',
  SELECT: 'select',
  SWITCH: 'switch',
  DATETIME_LOCAL: 'datetime-local',
};

const getEmptyTask = async taskType => {
  console.log(['api:getEmptyTask'], taskType);
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
      defaultValueByTaskTypeAndFieldId[taskType] && defaultValueByTaskTypeAndFieldId[taskType][fieldId] ||
      defaultValueByFieldId[fieldId] ||
      defaultValuesByTypeMap[type];

    return {
      ...field,
      value: defaultValue,
    };
  };
  try {
    const taskTypeModel = await TaskTypeModel.findOne({ typeId: taskType });
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    const getTypeRelatedFields = (type, aggregator = []) => {
      const { parentId, fields = [] } = type.toJSON();
      aggregator.push(...fields);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };

    return {
      taskType,
      fields: getTypeRelatedFields(taskTypeModel).map(mapFieldDefaultValue),
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
    return await TaskTypeModel.findById(id);
  }

  catch (error) {
    console.error(['api:getTask:error'], error);
    return error;
  }
};
const getTaskTypeList = async () => {
  console.log(['api:getTaskTypeList']);
  try {
    const taskTypeList = await TaskTypeModel.find().sort({ _id : -1 });
    const getTypeRelatedFields = (type, aggregator = []) => {
      const { parentId, fields = [] } = type.toJSON();
      aggregator.push(...fields);

      if (parentId) {
        const parentType = taskTypeList.find(task => task.get('typeId') === parentId);
        getTypeRelatedFields(parentType, aggregator);
      }

      return aggregator;
    };

    return taskTypeList.map(type => ({
      ...type.toJSON(),
      fields: getTypeRelatedFields(type),
    }));
  }

  catch (error) {
    console.error(['api:getTaskTypeList:error'], error);
    return error;
  }
};

const saveTask = async ({ taskId, task, isNew = true }) => {
  console.log(['api:saveTask'], { taskId, task, isNew });
  try {
    const { fields } = task;

    return await (isNew ? addTask(task) : TaskModel.findByIdAndUpdate(taskId, { fields }));
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

    return await (isNew ? addTask(taskType) : TaskTypeModel.findByIdAndUpdate(taskTypeId, { fields }));
  }

  catch (error) {
    console.error(['api:saveTaskType:error'], error);
    return error;
  }
};

module.exports = {
  addSubscription,
  addTask,
  addTaskType,
  deleteTask,
  deleteTaskType,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getEmptyTask,
  getTask,
  getTaskList,
  getTaskType,
  getTaskTypeList,
  saveTask,
  saveTaskType,
};
