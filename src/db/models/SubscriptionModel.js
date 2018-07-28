const mongoose = require('mongoose');

const subscriptionModel = mongoose.Schema({
  ownerId: String,
  subscription: Object,
});
const SubscriptionModel = mongoose.model('Subscription', subscriptionModel);

module.exports = SubscriptionModel;
