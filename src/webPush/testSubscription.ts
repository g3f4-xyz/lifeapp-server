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
      },
    });

    // console.log(['subscriptionData'], subscriptionData)

    // Pass subscription into sendNotification
    const { statusCode, body, headers } = await sendNotification(subscriptionData, payload);

    console.log(['{ statusCode, body, headers }'], { statusCode, body, headers });

    return statusCode;
  } catch (error) {
    console.log(['error'], error);
    return error.statusCode;
  }
};
