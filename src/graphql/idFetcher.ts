import { fromGlobalId } from 'graphql-relay';
import settingsApi from '../db/api/settings/settingsApi';
import TaskApi from '../db/api/task/taskApi';

const taskApi = new TaskApi({ token: '' });

const GETTERS = {
  TaskType: taskApi.getTask,
  TaskListType: taskApi.getTaskList,
  SettingsType: settingsApi.getSettings,
};

export const idFetcher = async (globalId: string): Promise<any> => {
  const { type, id } = fromGlobalId(globalId);
  const node = GETTERS[type] ? await GETTERS[type](id) : null;

  if (node) {
    return node;
  }

  return null;
};
