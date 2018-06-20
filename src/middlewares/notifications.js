const { addSubscription } = require('../api');

module.exports = async (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // save subscription for agenda
  const { id: ownerId } = req.user;
  await addSubscription(ownerId, subscription);

  // Send 201 - resource created
  res.status(201).json({});

  const webpush = require('web-push');
  const payload = JSON.stringify({
    title: 'Welcome to LifeApp!',
    notification: {
      body: 'This notification is test. It will be send always after entering page if notifications were allowed on this page.',
      icon: 'https://avatars2.githubusercontent.com/u/25178950?s=200&v=4',
    },
  });

  // Pass subscription into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
};
