import { sendNotification } from 'web-push';
import { STATUSES } from '../constants';

import { getSubscriptionData } from '../db/api';

export const testSubscription = async (ownerId: string, subscriptionModelId: string) => {
  try {
    const subscriptionData = await getSubscriptionData(ownerId, subscriptionModelId);

    const payload = JSON.stringify({
      title: 'Welcome to LifeApp!',
      notification: {
        body: 'This notification is test.' +
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
            icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
          },
          {
            action: 'close',
            title: 'Close notification',
            icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
          },
        ],
      },
    });

    const { statusCode } = await sendNotification(subscriptionData, payload);

    return statusCode;
  } catch (error) {
    console.error(['testSubscription.error'], error);
    return error.statusCode ? error.statusCode : STATUSES.REQUEST_TIMEOUT;
  }
};
