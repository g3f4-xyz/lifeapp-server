import settingsApi from '../../db/api/settings/settingsApi';
import NotificationsService from '../NotificationsService';

describe('NotificationsService', () => {
  it('should create new service', async () => {
    const settingsService = new NotificationsService(settingsApi);

    expect(settingsService).toBeDefined();
  });

  describe('testSubscription', () => {
    it('should test subscription', () => {
      // TODO
    });

    it('should handle error', () => {
      // TODO
    });
  });
});
