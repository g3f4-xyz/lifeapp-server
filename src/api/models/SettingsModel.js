const mongoose = require('mongoose');

const settingsModel = mongoose.Schema({
  ownerId: String,
  notification: Object,
  authentication: Object,
});
const SettingsModel = mongoose.model('Settings', settingsModel);

module.exports = SettingsModel;
