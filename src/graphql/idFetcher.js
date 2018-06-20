const { fromGlobalId } = require('graphql-relay');
const { getTask, getTaskList, getTaskType, getTaskTypeList, getUser } = require('../api');

const GETTERS = {
  TaskType: getTask,
  TaskListType: getTaskList,
  TaskTypeType: getTaskType,
  TaskTypeListType: getTaskTypeList,
  UserType: getUser,
};

module.exports = async globalId => {
  const { type, id } = fromGlobalId(globalId);
  console.log(['idFetcher'], globalId, { type, id });
  const node = GETTERS[type] ? await GETTERS[type](id) : null;

  console.log(['idFetcher.node'], node);

  if (node) {
    return node;
  }

  console.error(['idFetcher.error'], 'Cannot resolve node by id.');

  return null;
};
