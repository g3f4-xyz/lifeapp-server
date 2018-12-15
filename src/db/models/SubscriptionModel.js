const mongoose = require('mongoose');

const subscriptionModel = mongoose.Schema({
  ownerId: { type: String, ref: 'Settings' },
  subscription: Object,
  userAgent: String,
  userDeviceType: String,
});
const SubscriptionModel = mongoose.model('Subscription', subscriptionModel);

module.exports = SubscriptionModel;
