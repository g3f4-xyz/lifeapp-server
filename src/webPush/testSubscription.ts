import { sendNotification } from 'web-push';

import { getSubscription } from '../db/api';

export const testSubscription = async (ownerId: string, subscriptionModelId: string) => {
  try {
    const subscription = await getSubscription(ownerId, subscriptionModelId);

    const { subscriptionData } = subscription;
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
          {action: 'test', title: 'Test',
            icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4'},
          {action: 'close', title: 'Close notification',
            icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4'},
        ],
      },
    });

    const { statusCode } = await sendNotification(subscriptionData, payload);

    return statusCode;
  } catch (error) {
    console.log(['testSubscription.error'], error);
    return error.statusCode;
  }
};
