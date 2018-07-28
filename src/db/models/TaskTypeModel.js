const mongoose = require('mongoose');

const taskTypeModel = mongoose.Schema({
  name: String,
  typeId: String,
  description: String,
  order: Number,
  isCustom: Boolean,
  parentID: String,
  fields: Array,
});
const TaskTypeModel = mongoose.model('TaskType', taskTypeModel);

module.exports = TaskTypeModel;
