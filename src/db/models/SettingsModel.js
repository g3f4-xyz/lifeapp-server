const mongoose = require('mongoose');

const settingsModel = mongoose.Schema({
  ownerId: String,
  notifications: Object,
  authentication: Object,
});
const SettingsModel = mongoose.model('Settings', settingsModel);

module.exports = SettingsModel;
