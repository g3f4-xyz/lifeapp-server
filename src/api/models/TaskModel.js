const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
  ownerId: String,
  taskType: String,
  fields: Array,
});
const TaskModel = mongoose.model('Task', taskModel);

module.exports = TaskModel;
