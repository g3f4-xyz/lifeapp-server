const webpush = require('web-push');

const { getSubscription } = require('../db/api');

module.exports = async subscriptionId => {
  try {
    const { subscription } = await getSubscription(subscriptionId);

    const payload = JSON.stringify({
      title: 'Welcome to LifeApp!',
      notification: {
        body: 'This notification is test. It will be send always after entering page if notifications were allowed on this page.',
        icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
      },
    });

    // Pass subscription into sendNotification
    const { statusCode } = await webpush.sendNotification(subscription, payload);

    return statusCode;
  }

  catch (e) {
    console.error(['testSubscription.error'], e);

    return e.statusCode;
  }
};
