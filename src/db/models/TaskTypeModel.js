const mongoose = require('mongoose');

const FieldSchema = require('../schemas/FieldSchema');

const taskTypeModel = mongoose.Schema({
  name: String,
  typeId: String,
  description: String,
  order: Number,
  isCustom: Boolean,
  parentID: String,
  fields: [FieldSchema],
});
const TaskTypeModel = mongoose.model('TaskType', taskTypeModel);

module.exports = TaskTypeModel;
