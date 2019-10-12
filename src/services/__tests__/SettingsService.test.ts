import { ObjectId } from 'bson';
import { TASK_TYPE } from '../../constants';
import settingsApi from '../../db/api/settings/settingsApi';
import { Settings } from '../../db/interfaces';
import AppError from '../../utils/AppError';
import SettingsService from '../SettingsService';

describe('SettingsService', () => {
  it('should create new service', async () => {
    const settingsService = new SettingsService(settingsApi);

    expect(settingsService).toBeDefined();
  });

  describe('addSubscription', () => {
    it('should add subscription', async () => {
      const ownerId = '1234';
      const subscriptionData = {
        endpoint: 'endpoint',
        expirationTime: 'expirationTime',
        keys: {
          auth: 'auth',
          p256dh: 'p256dh',
        },
      };
      const userAgent = 'userAgent';
      const userDeviceType = 'userDeviceType';

      jest.spyOn(settingsApi, 'getSettings').mockResolvedValue({
        _id: new ObjectId('5d94cb40aab62b5aeec481c6'),
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
          subscriptions: [
            {
              _id: '5d94cb40d4b62b5aeec481c5',
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
      });
      jest.spyOn(settingsApi, 'addSubscription').mockResolvedValue(undefined);

      const settingsService = new SettingsService(settingsApi);

      expect(async () => {
        await settingsService.addSubscription(
          ownerId,
          subscriptionData,
          userAgent,
          userDeviceType,
        );
      }).not.toThrow();
    });

    it('should delete with the same endpoint subscription and save new', async () => {
      const endpoint = 'endpoint';
      const ownerId = '1234';
      const subscriptionId = '5d94cb40d4b62b5aeec481c5';
      const subscriptionData = {
        _id: subscriptionId,
        endpoint,
        expirationTime: 'expirationTime',
        keys: {
          auth: 'auth',
          p256dh: 'p256dh',
        },
      };
      const userAgent = 'userAgent';
      const userDeviceType = 'userDeviceType';
      jest.spyOn(settingsApi, 'getSettings').mockResolvedValue({
        _id: new ObjectId('5d94cb40aab62b5aeec481c5'),
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
          subscriptions: [
            {
              _id: subscriptionId,
              subscriptionData: {
                endpoint,
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
      });
      const addSubscriptionSpy = jest
        .spyOn(settingsApi, 'addSubscription')
        .mockResolvedValue(undefined);
      const deleteSubscriptionSpy = jest
        .spyOn(settingsApi, 'deleteSubscription')
        .mockResolvedValue(undefined);
      const settingsService = new SettingsService(settingsApi);

      await settingsService.addSubscription(
        ownerId,
        subscriptionData,
        userAgent,
        userDeviceType,
      );

      expect(deleteSubscriptionSpy).toHaveBeenCalledWith(
        ownerId,
        subscriptionId,
      );
      expect(addSubscriptionSpy).toHaveBeenCalled();
    });
  });

  describe('deleteSubscription', () => {
    it('should delete user subscription data', async () => {
      const ownerId = '1234';
      const subscriptionId = '12345678';
      const deleteSubscriptionSpy = jest
        .spyOn(settingsApi, 'deleteSubscription')
        .mockResolvedValue({
          _id: new ObjectId('5d94cb40aab62b5aeec481c1'),
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
      const settingsService = new SettingsService(settingsApi);

      expect(async () => {
        await settingsService.deleteSubscription(ownerId, subscriptionId);
      }).not.toThrow();
      expect(deleteSubscriptionSpy).toHaveBeenCalledWith(
        ownerId,
        subscriptionId,
      );
    });

    it('should throw specific error when deleting user subscription fails', async () => {
      const ownerId = '1234';
      const subscriptionId = '12345678';
      const deleteSubscriptionSpy = jest
        .spyOn(settingsApi, 'deleteSubscription')
        .mockRejectedValue(new AppError('error', 'api'));
      const settingsService = new SettingsService(settingsApi);

      try {
        await settingsService.deleteSubscription(ownerId, subscriptionId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('error');
        expect(e.level).toBe('api');
      }

      expect(deleteSubscriptionSpy).toHaveBeenCalledWith(
        ownerId,
        subscriptionId,
      );
    });
  });

  describe('getSettings', () => {
    it('should get user settings', async () => {
      const ownerId = '1234';
      const settings: Settings = {
        _id: new ObjectId('5d94cb40acb62b5aeec481c6'),
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
      };
      const getSettingsSpy = jest
        .spyOn(settingsApi, 'getSettings')
        .mockResolvedValue(settings);
      const settingsService = new SettingsService(settingsApi);

      expect(await settingsService.getSettings(ownerId)).toEqual(settings);
      expect(getSettingsSpy).toHaveBeenCalledWith(ownerId);
    });

    it('should handle error when api fails', async () => {
      const ownerId = '1234';
      const getSettingsSpy = jest
        .spyOn(settingsApi, 'getSettings')
        .mockRejectedValue(new AppError('error', 'api'));
      const settingsService = new SettingsService(settingsApi);

      try {
        await settingsService.getSettings(ownerId);
      } catch (e) {
        expect(e).toBeInstanceOf(AppError);
        expect(e.code).toBe('error');
        expect(e.level).toBe('api');
      }

      expect(getSettingsSpy).toHaveBeenCalledWith(ownerId);
    });
  });

  describe('updateNotificationsGeneral', () => {
    it('should update notifications general setting', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('updateNotificationsTypes', () => {
    it('should update notifications general setting', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('updateTaskListStatusFilter', () => {
    it('should update notifications general setting', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('updateTaskListTitleFilter', () => {
    it('should update notifications general setting', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });

  describe('updateTaskListTaskTypeFilter', () => {
    it('should update notifications general setting', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });
});
