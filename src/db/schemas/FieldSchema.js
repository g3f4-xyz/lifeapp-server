const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  fieldId: String,
  format: String,
  type: String,
  order: Number,
  label: String,
  helperText: String,
  meta: {
    required: Boolean,
    minLen: Number,
    maxLen: Number,
    options: [{
      text: String,
      value: String,
    }],
    defaultValue: String,
    parentId: String,
    optionsSet: [{
      customValueOptionMask: String,
      parentValue: String,
      options: [{
        text: String,
        value: String,
      }],
    }],
  },
  value: {
    bool: Boolean,
    id: String,
    text: String,
    number: Number,
    ids: [String],
    parentValue: String,
    customValueOptionValue: String,
  },
});
