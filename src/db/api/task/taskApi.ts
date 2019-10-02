import { Moment } from 'moment';
import * as moment from 'moment-timezone';
import { FIELD_ID, FIELD_TYPE, TASK_TYPE } from '../../../constants';
import { Field, FieldValue, Task } from '../../interfaces';
import { registerFieldsDiscriminators } from '../../models/registerFieldsDiscriminators';
import {
  calculateNotificationAt,
  isNotificationAtUpdateNeeded,
  TASK_FIELDS,
  TaskModel,
} from '../../models/tasks/TaskModel';
import { getSettings } from '../api';
import getFieldDefaultValue from './getFieldDefaultValue';

registerFieldsDiscriminators();

export const updateTaskField = async (
  taskId: string,
  fieldId: FIELD_ID,
  value: FieldValue,
): Promise<Field> => {
  // tutaj wiem jakie pole się zmienia. brakuje jeszcze tylko taskType
  const task = await TaskModel.findById(taskId);
  const fieldIndex = task.fields.findIndex(field => field.fieldId === fieldId);
  const validationErrors = task.fields[fieldIndex].validateField();

  task.fields[fieldIndex].value = value;

  if (isNotificationAtUpdateNeeded(task.taskType, task.lastChangedFieldId)) {
    const lastChangedField = task.fields.find(
      field => field.fieldId === task.lastChangedFieldId,
    );

    task.notificationAt = calculateNotificationAt(
      task.taskType,
      task.lastNotificationAt,
      lastChangedField.value,
    );
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
    // @ts-ignore
    ...task.fields[fieldIndex].toJSON(),
    validationErrors,
  };
};
export const deleteTask = async (id: string): Promise<string> => {
  const task = await TaskModel.findById(id);

  await task.remove();

  return id;
};
export const deleteTasks = async (ownerId: string): Promise<string> => {
  const tasks = await TaskModel.find({ ownerId });

  tasks.forEach(model => model.remove());

  return ownerId;
};
export const deleteUntouchedTasks = async (): Promise<void> => {
  const tasks = await TaskModel.find({ updatedAt: { $exists: false } });

  tasks.forEach(model => model.remove());
};
export const getTasksWithActiveNotificationInPeriod = async (
  taskType: TASK_TYPE,
  startDate: Moment,
  endDate: Moment,
): Promise<Task[]> => {
  const routines = await TaskModel.find({
    taskType,
    notificationAt: {
      $gte: startDate.toDate(),
      $lte: endDate.toDate(),
    },
    fields: {
      $elemMatch: {
        $and: [
          { fieldId: 'NOTIFICATIONS' },
          { fieldType: 'NESTED' },
          { value: { $exists: true } },
          { ['value.ownValue']: { $exists: true } },
          { ['value.ownValue.enabled']: { $exists: true } },
          { ['value.ownValue.enabled']: true },
        ],
      },
    },
  });

  return routines.map(doc => doc.toJSON());
};
export const getTasksWithActiveNotification = async (
  taskType: TASK_TYPE,
): Promise<Task[]> => {
  const routines = await TaskModel.find({
    taskType,
    $and: [
      ...[
        {
          fields: {
            $elemMatch: {
              $and: [
                { fieldId: 'NOTIFICATIONS' },
                { fieldType: 'NESTED' },
                { value: { $exists: true } },
                { ['value.ownValue']: { $exists: true } },
                { ['value.ownValue.enabled']: { $exists: true } },
                { ['value.ownValue.enabled']: true },
              ],
            },
          },
        },
      ],
      ...(taskType === TASK_TYPE.ROUTINE
        ? [
            {
              fields: {
                $elemMatch: {
                  $and: [
                    { fieldId: FIELD_ID.ACTIVE },
                    { fieldType: FIELD_TYPE.SWITCH },
                    { value: { $exists: true } },
                    { ['value.enabled']: { $exists: true } },
                    { ['value.enabled']: true },
                  ],
                },
              },
            },
          ]
        : []),
    ],
  });

  return routines.map(doc => doc.toJSON());
};
export const disableTaskNotification = async (taskId: any): Promise<void> => {
  await TaskModel.findOneAndUpdate(
    {
      _id: taskId,
      fields: {
        $elemMatch: {
          $and: [
            { fieldId: 'NOTIFICATIONS' },
            { fieldType: 'NESTED' },
            { value: { $exists: true } },
            { ['value.ownValue']: { $exists: true } },
            { ['value.ownValue.enabled']: { $exists: true } },
            { ['value.ownValue.enabled']: true },
          ],
        },
      },
    },
    {
      $set: {
        ['fields.$.value.ownValue.enabled']: false,
        ['fields.$.meta.ownMeta.disabled']: true,
      },
    },
  );
};
export const updateNotificationAt = async (
  taskId: string,
  notificationAt: Date,
  lastNotificationAt: Date,
): Promise<void> => {
  await TaskModel.findByIdAndUpdate(taskId, {
    $set: {
      notificationAt,
      lastNotificationAt,
    },
  });
};
export const getEmptyTask = async (
  taskType: TASK_TYPE,
  ownerId: string,
): Promise<Task> => {
  const taskDocument = await TaskModel.create({
    ownerId,
    taskType,
    fields: TASK_FIELDS[taskType].map(getFieldDefaultValue),
  });

  await taskDocument.save();

  return taskDocument.toJSON();
};
export const getTask = async (id: string): Promise<Task> => {
  const task = await TaskModel.findById(id);

  return task.toJSON();
};
export const getTaskList = async (ownerId: string): Promise<Task[]> => {
  const { taskList } = await getSettings(ownerId);
  const { filters } = taskList;

  return (await TaskModel.find({
    ownerId,
    updatedAt: { $exists: true },
    taskType: { $in: filters.taskType },
    $and: [
      ...[
        {
          fields: {
            $elemMatch: {
              $and: [
                { fieldId: FIELD_ID.TITLE },
                { fieldType: FIELD_TYPE.TEXT },
                { value: { $exists: true } },
                { ['value.text']: { $exists: true } },
                {
                  ['value.text']: {
                    $regex: new RegExp(filters.title),
                    $options: 'i',
                  },
                },
              ],
            },
          },
        },
      ],
      ...(filters.status
        ? [
            {
              fields: {
                $elemMatch: {
                  $and: [
                    { fieldId: FIELD_ID.STATUS },
                    { fieldType: FIELD_TYPE.CHOICE },
                    { value: { $exists: true } },
                    { ['value.id']: { $exists: true } },
                    { ['value.id']: filters.status },
                  ],
                },
              },
            },
          ]
        : []),
    ],
  }).sort({ _id: -1 })).map(doc => doc.toJSON());
};
