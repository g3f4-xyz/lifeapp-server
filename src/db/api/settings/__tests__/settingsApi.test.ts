import { ObjectId } from 'mongodb';
import { TASK_TYPE } from '../../../../constants';
import AppError from '../../../../utils/AppError';
import mockMongoCollection from '../../../../utils/tests/mockMongoCollection';
import setupMongo from '../../../../utils/tests/setupMongo';
import { Subscription } from '../../../interfaces';
import { SettingsModel } from '../../../models/settings/SettingsModel';
import settingsApi from '../settingsApi';

describe('settingsApi', () => {
  const firstUser = {
    id: '1234567890',
    subscriptionId: '5d94cb40d4b62b5aeec481c5',
  };
  const secondUser = {
    id: '0987654321',
  };

  setupMongo({
    async beforeEachExtend() {
      await mockMongoCollection(SettingsModel, [
        {
          ownerId: firstUser.id,
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
            subscriptions: [
              {
                _id: new ObjectId(firstUser.subscriptionId),
                subscriptionData: {
                  endpoint: 'endpoint',
                  expirationTime: 'expirationTime',
                  keys: {
                    auth: 'auth',
                    p256dh: 'p256dh',
                  },
                },
                userAgent: 'userAgent',
                userDeviceType: 'userDeviceType',
              },
            ],
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
          ownerId: secondUser.id,
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
      const ownerId = firstUser.id;
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
        subscriptions: [
          {
            _id: new ObjectId('5d94cb40d4b62b5aeec481c5'),
            subscriptionData: {
              endpoint: 'endpoint',
              expirationTime: 'expirationTime',
              keys: {
                auth: 'auth',
                p256dh: 'p256dh',
              },
            },
            userAgent: 'userAgent',
            userDeviceType: 'userDeviceType',
          },
        ],
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
      const ownerId = firstUser.id;

      try {
        await settingsApi.createSettings(ownerId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('DUPLICATE_SETTINGS');
        expect(e.level).toBe('api');
      }
    });
  });

  describe('addSubscription', () => {
    it('should add subscription', async () => {
      const ownerId = firstUser.id;
      const settings = await settingsApi.getSettings(ownerId);
      const subscription: Subscription = {
        _id: undefined,
        subscriptionData: {
          endpoint: 'endpoint',
          expirationTime: 'expirationTime',
          keys: {
            auth: 'auth',
            p256dh: 'p256dh',
          },
        },
        userAgent: 'userAgent',
        userDeviceType: 'userDeviceType',
      };

      expect(settings.notifications.subscriptions.length).toBe(1);

      const settingsAfter = await settingsApi.addSubscription(
        ownerId,
        subscription,
      );

      expect(settingsAfter.notifications.subscriptions.length).toBe(2);
    });
  });

  describe('deleteSubscription', () => {
    it('should delete subscription', async () => {
      const ownerId = firstUser.id;
      const subscriptionId = firstUser.subscriptionId;
      const settings = await settingsApi.getSettings(ownerId);
      const subscription = settings.notifications.subscriptions.find(
        ({ _id }) => _id.toString() === subscriptionId.toString(),
      );

      expect(subscription).toBeDefined();
      expect(settings.notifications.subscriptions.length).toBe(1);

      const settingsAfter = await settingsApi.deleteSubscription(
        ownerId,
        subscriptionId,
      );

      expect(settingsAfter.notifications.subscriptions[0]).not.toBeDefined();
      expect(settingsAfter.notifications.subscriptions.length).toBe(0);
    });

    it('should not change nothing trying to delete non-existing subscription', async () => {
      const ownerId = firstUser.id;
      const subscriptionId = new ObjectId().toString();
      const settings = await settingsApi.getSettings(ownerId);

      expect(settings.notifications.subscriptions.length).toBe(1);

      const settingsAfter = await settingsApi.deleteSubscription(
        ownerId,
        subscriptionId,
      );

      expect(settingsAfter.notifications.subscriptions.length).toBe(1);
    });

    it('should handle error', async () => {
      const ownerId = '1';
      const subscriptionId = new ObjectId().toString();

      try {
        await settingsApi.deleteSubscription(ownerId, subscriptionId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('NO_USER_SETTINGS');
        expect(e.level).toBe('api');
      }
    });
  });
});
