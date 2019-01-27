const mongoose = require('mongoose');

const FieldSchema = require('../schemas/FieldSchema');

const taskModel = mongoose.Schema({
  ownerId: String,
  taskType: String,
  fields: [FieldSchema],
});
const TaskModel = mongoose.model('Task', taskModel);

module.exports = TaskModel;
