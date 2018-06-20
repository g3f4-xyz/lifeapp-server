const TaskModel = require('../../api/models/TaskModel');
const TaskTypeModel = require('../../api/models/TaskTypeModel');

module.exports = obj => {
  if (obj instanceof TaskModel) {
    return require('../types/TaskType');
  }
  else if (obj instanceof TaskTypeModel) {
    return require('../types/TaskTypeType');
  }

  console.error(['nodeDefinitions.typeResolver.error'], 'Cannot match instance class.');
};
