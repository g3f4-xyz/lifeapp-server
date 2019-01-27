const mongoose = require('mongoose');
const SubscriptionSchema = require('../schemas/SubscriptionSchema');

const settingsModel = mongoose.Schema({
  ownerId: String,
  notifications: {
    general: {
      show: Boolean,
      vibrate: Boolean,
    },
    types: {
      events: Boolean,
      meetings: Boolean,
      todos: Boolean,
      routines: Boolean,
    },
    subscriptions: [{
      subscription: SubscriptionSchema,
      userAgent: String,
      userDeviceType: String,
    }],
  },
});
const SettingsModel = mongoose.model('Settings', settingsModel);

module.exports = SettingsModel;
