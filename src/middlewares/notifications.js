const useragent = require('useragent');
const device = require('device');

const { addSubscription } = require('../db/api');
const { DEMO_USER } = require('../config');

module.exports = async (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  const { family: userAgent } = useragent.parse(req.headers['user-agent']);
  const { type: userDeviceType } = device(req.headers['user-agent']);
  console.log(['userAgent'], userAgent)
  console.log(['userDeviceType'], userDeviceType)
  // save subscription for agenda
  const { id: ownerId } = req.user || DEMO_USER;
  await addSubscription(ownerId, subscription, userAgent, userDeviceType);

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
