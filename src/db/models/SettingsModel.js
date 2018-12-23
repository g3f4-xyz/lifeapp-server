const mongoose = require('mongoose');

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
      subscription: Object,
      userAgent: String,
      userDeviceType: String,
    }],
  },
});
const SettingsModel = mongoose.model('Settings', settingsModel);

module.exports = SettingsModel;
