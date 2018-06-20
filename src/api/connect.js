const mongoose = require('mongoose');
const { DB_HOST } = require('../config');
require('./emitter');

// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect(DB_HOST);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log(`MongoDB connected to host: ${DB_HOST}`));

module.exports = mongoose.connection;
