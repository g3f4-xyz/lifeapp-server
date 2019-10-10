import { TASK_TYPE } from '../../constants';
import settingsApi from '../../db/api/settings/settingsApi';
import AppError from '../../utils/AppError';
import SettingsService from '../SettingsService';

describe('SettingsService', () => {
  it('should create new service', async () => {
    const userService = new SettingsService(settingsApi);

    expect(userService).toBeDefined();
  });

  describe('deleteUserSubscription method', () => {
    it('should delete user subscription data', async () => {
      const ownerId = '1234';
      const subscriptionId = '12345678';
      const deleteSubscriptionSpy = jest
        .spyOn(settingsApi, 'deleteSubscription')
        .mockResolvedValue({
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
      const userService = new SettingsService(settingsApi);

      expect(async () => {
        await userService.deleteUserSubscription(ownerId, subscriptionId);
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
      const userService = new SettingsService(settingsApi);

      try {
        await userService.deleteUserSubscription(ownerId, subscriptionId);
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
});
