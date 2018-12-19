const mongoose = require('mongoose');

const settingsModel = mongoose.Schema({
  ownerId: String,
  notifications: Object,
});
const SettingsModel = mongoose.model('Settings', settingsModel);

module.exports = SettingsModel;
