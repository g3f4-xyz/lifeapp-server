import { TASK_TYPE } from '../constants';
import { SettingsApi } from '../db/api/settings/settingsApi';

const settingsApiStub: SettingsApi = {
  async createSettings(ownerId) {
    return Promise.resolve({
      ownerId,
      notifications: {
        general: {
          show: true,
          vibrate: true,
        },
        types: {
          events: true,
          meetings: true,
          todos: true,
          routines: true,
          goals: true,
        },
        subscriptions: [],
      },
      taskList: {
        filters: {
          title: '',
          taskType: Object.values(TASK_TYPE),
          status: null,
        },
      },
    });
  },
  async getSettings(_ownerId) {
    return Promise.resolve(null);
  },
  async deleteSubscription(ownerId, subscriptionId) {
    return Promise.resolve(`${ownerId}${subscriptionId}`);
  },
  async addSubscription(
    _ownerId,
    _subscriptionData,
    _userAgent,
    _userDeviceType,
  ) {
    return Promise.resolve();
  },
  async deleteSettings(ownerId) {
    return Promise.resolve(ownerId);
  },
  async getSubscriptionData(_ownerId, _subscriptionId) {
    return Promise.resolve({
      endpoint: '',
      expirationTime: '',
      keys: {
        auth: '',
        p256dh: '',
      },
    });
  },
  async saveNotificationsGeneral(_ownerId, general) {
    return Promise.resolve(general);
  },
  async saveNotificationsTypes(_ownerId, types) {
    return Promise.resolve(types);
  },
  async saveTaskListStatusFilter(_ownerId, status) {
    return Promise.resolve(status);
  },
  async saveTaskListTaskTypeFilter(_ownerId, taskTypeFilter) {
    return Promise.resolve(taskTypeFilter);
  },
  async saveTaskListTitleFilter(_ownerId, title) {
    return Promise.resolve(title);
  },
};

export default settingsApiStub;
