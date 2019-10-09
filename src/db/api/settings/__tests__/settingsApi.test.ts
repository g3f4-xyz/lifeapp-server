import { TASK_TYPE } from '../../../../constants';
import mockMongoCollection from '../../../../utils/tests/mockMongoCollection';
import setupMongo from '../../../../utils/tests/setupMongo';
import { SettingsModel } from '../../../models/settings/SettingsModel';
import AppError from '../../../../utils/AppError';
import settingsApi from '../settingsApi';

describe('settingsApi', () => {
  setupMongo({
    async beforeAllExtend() {
      await mockMongoCollection(SettingsModel, [
        {
          ownerId: '1234567890',
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
        },
        {
          ownerId: '0987654321',
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
        },
      ]);
    },
  });

  describe('settingsApi.getSettings', () => {
    it('should get existing user settings', async () => {
      const ownerId = '1234567890';
      const settings = await settingsApi.getSettings(ownerId);

      expect(settings).toBeTruthy();
      expect(settings.ownerId).toBe(ownerId);
      expect(settings.notifications).toEqual({
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
      });
      expect(settings.taskList).toEqual({
        filters: {
          title: '',
          taskType: Object.values(TASK_TYPE),
          status: null,
        },
      });
    });
  });

  describe('settingsApi.createSettings', () => {
    it('should create user settings', async () => {
      const ownerId = '1234';
      const settings = await settingsApi.createSettings(ownerId);

      expect(settings).toBeTruthy();
      expect(settings.ownerId).toBe(ownerId);
      expect(settings.notifications).toEqual({
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
      });
      expect(settings.taskList).toEqual({
        filters: {
          title: '',
          taskType: Object.values(TASK_TYPE),
          status: null,
        },
      });
    });

    it('should not create user settings when already created', async () => {
      const ownerId = '1234567890';

      try {
        await settingsApi.createSettings(ownerId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('DUPLICATE_SETTINGS');
        expect(e.level).toBe('api');
      }
    });
  });
});
