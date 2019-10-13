import { sendNotification } from 'web-push';
import { HttpStatus, httpStatuses } from '../constants';
import { SettingsApi } from '../db/api/settings/settingsApi';

export default class NotificationsService {
  constructor(readonly settingsApi: SettingsApi) {}

  async testSubscription(
    ownerId: string,
    subscriptionId: string,
  ): Promise<HttpStatus> {
    try {
      const userSettings = await this.settingsApi.getSettings(ownerId);
      const {
        subscriptionData,
      } = userSettings.notifications.subscriptions.find(
        ({ id }) => id === subscriptionId,
      );

      if (!subscriptionData) {
        return httpStatuses.NOT_FOUND;
      }

      const payload = JSON.stringify({
        title: 'Welcome to LifeApp!',
        notification: {
          body:
            'This notification is test.' +
            ' It will be send always after entering page if notifications were allowed on this page.',
          icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
          },
          actions: [
            {
              action: 'test',
              title: 'Test',
              icon:
                'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
            },
            {
              action: 'close',
              title: 'Close notification',
              icon:
                'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
            },
          ],
        },
      });

      const { statusCode } = await sendNotification(subscriptionData, payload);

      return statusCode as HttpStatus;
    } catch (error) {
      return error.statusCode ? error.statusCode : httpStatuses.REQUEST_TIMEOUT;
    }
  }
}
