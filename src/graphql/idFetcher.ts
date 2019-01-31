import { fromGlobalId } from 'graphql-relay';
import { getSettings, getTask, getTaskList, getTaskType, getTaskTypeList } from '../db/api';

const GETTERS = {
  TaskType: getTask,
  TaskListType: getTaskList,
  TaskTypeType: getTaskType,
  TaskTypeListType: getTaskTypeList,
  SettingsType: getSettings,
};

export const idFetcher = async (globalId: string): Promise<any> => {
  const { type, id } = fromGlobalId(globalId);
  const node = GETTERS[type] ? await GETTERS[type](id) : null;

  if (node) {
    return node;
  }

  return null;
};
