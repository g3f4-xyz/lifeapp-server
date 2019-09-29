import * as moment from 'moment-timezone';
import { FIELD_ID } from '../../constants';
import { IField, IFieldValue } from '../interfaces';
import { calculateNotificationAt, isNotificationAtUpdateNeeded, TaskModel } from '../models/tasks/TaskModel';

export const updateTaskField = async (
  taskId: string,
  fieldId: FIELD_ID,
  value: IFieldValue,
): Promise<IField> => {
  try {
    // tutaj wiem jakie pole się zmienia. brakuje jeszcze tylko taskType
    const task = await TaskModel.findById(taskId);
    const fieldIndex = task.fields.findIndex(field => field.fieldId === fieldId);
    const validationErrors = task.fields[fieldIndex].validateField();

    task.fields[fieldIndex].value = value;

    if (isNotificationAtUpdateNeeded(task.taskType, task.lastChangedFieldId)) {
      const lastChangedField = task.fields.find(field => field.fieldId === task.lastChangedFieldId);

      task.notificationAt = calculateNotificationAt(task.taskType, task.lastNotificationAt, lastChangedField.value);
    }

    task.updatedAt = moment(new Date()).toISOString();
    task.lastChangedFieldId = fieldId;

    await task.save();

    // await TaskModel.findOneAndUpdate({
    //   _id: taskId,
    //   ['fields.fieldId']: fieldId,
    // }, {
    //   $set: {
    //     lastChangedFieldId: fieldId,
    //     ['fields.$.value']: value,
    //   },
    // });

    return {
      ...task.fields[fieldIndex],
      validationErrors,
    };
  } catch (error) {
    throw error;
  }
};
