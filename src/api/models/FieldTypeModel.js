const mongoose = require('mongoose');

const fieldTypeModel = mongoose.Schema({
  fieldId: String,
  format: String,
  type: String,
  order: Number,
  label: String,
  helperText: String,
  meta: Object,
  value: Object,
});
const FieldTypeModel = mongoose.model('Field', fieldTypeModel);

module.exports = FieldTypeModel;
