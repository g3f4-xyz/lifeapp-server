import { FIELD_ID, FIELD_TYPE, TASK_TYPE } from '../../../constants';
import { Task, TaskListSettingsFilters } from '../../interfaces';
import { TASK_FIELDS } from '../../models/tasks/taskFields';
import { TaskModel } from '../../models/tasks/TaskModel';
import getFieldDefaultValue from './getFieldDefaultValue';

const taskApi = {
  async deleteTask(taskId: string): Promise<string> {
    const task = await TaskModel.findById(taskId);

    await task.remove();

    return taskId;
  },
  async deleteTasks(ownerId: string): Promise<string> {
    const tasks = await TaskModel.find({ ownerId });

    tasks.forEach(model => model.remove());

    return ownerId;
  },
  async getEmptyTask(ownerId: string, taskType: TASK_TYPE): Promise<Task> {
    const taskDocument = await TaskModel.create({
      ownerId,
      taskType,
      fields: TASK_FIELDS[taskType].map(getFieldDefaultValue),
    });

    await taskDocument.save();

    return taskDocument.toJSON();
  },
  async getTask(taskId: string): Promise<Task> {
    const task = await TaskModel.findById(taskId);

    return task.toJSON();
  },
  async getTaskList(
    ownerId: string,
    filters: TaskListSettingsFilters,
  ): Promise<Task[]> {
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
  },
  async saveTask(task: Task): Promise<Task> {
    const taskDocument = await TaskModel.findByIdAndUpdate(task._id, task, {
      new: true,
    });

    return await taskDocument.toJSON();
  },
  //  async deleteUntouchedTasks(): Promise<void> {
  //    const tasks = await TaskModel.find({ updatedAt: { $exists: false } });
  //
  //    tasks.forEach(model => model.remove());
  //  },
  //  async getTasksWithActiveNotificationInPeriod(
  //    taskType: TASK_TYPE,
  //    startDate: Date,
  //    endDate: Date,
  //  ): Promise<Task[]> {
  //    const routines = await TaskModel.find({
  //      taskType,
  //      notificationAt: {
  //        $gte: startDate,
  //        $lte: endDate,
  //      },
  //      fields: {
  //        $elemMatch: {
  //          $and: [
  //            { fieldId: 'NOTIFICATIONS' },
  //            { fieldType: 'NESTED' },
  //            { value: { $exists: true } },
  //            { ['value.ownValue']: { $exists: true } },
  //            { ['value.ownValue.enabled']: { $exists: true } },
  //            { ['value.ownValue.enabled']: true },
  //          ],
  //        },
  //      },
  //    });
  //
  //    return routines.map(doc => doc.toJSON());
  //  },
  //  async getTasksWithActiveNotification(taskType: TASK_TYPE): Promise<Task[]> {
  //    const routines = await TaskModel.find({
  //      taskType,
  //      $and: [
  //        ...[
  //          {
  //            fields: {
  //              $elemMatch: {
  //                $and: [
  //                  { fieldId: 'NOTIFICATIONS' },
  //                  { fieldType: 'NESTED' },
  //                  { value: { $exists: true } },
  //                  { ['value.ownValue']: { $exists: true } },
  //                  { ['value.ownValue.enabled']: { $exists: true } },
  //                  { ['value.ownValue.enabled']: true },
  //                ],
  //              },
  //            },
  //          },
  //        ],
  //        ...(taskType === TASK_TYPE.ROUTINE
  //          ? [
  //              {
  //                fields: {
  //                  $elemMatch: {
  //                    $and: [
  //                      { fieldId: FIELD_ID.ACTIVE },
  //                      { fieldType: FIELD_TYPE.SWITCH },
  //                      { value: { $exists: true } },
  //                      { ['value.enabled']: { $exists: true } },
  //                      { ['value.enabled']: true },
  //                    ],
  //                  },
  //                },
  //              },
  //            ]
  //          : []),
  //      ],
  //    });
  //
  //    return routines.map(doc => doc.toJSON());
  //  },
  //  async disableTaskNotification(taskId: string): Promise<void> {
  //    await TaskModel.findOneAndUpdate(
  //      {
  //        _id: taskId,
  //        fields: {
  //          $elemMatch: {
  //            $and: [
  //              { fieldId: 'NOTIFICATIONS' },
  //              { fieldType: 'NESTED' },
  //              { value: { $exists: true } },
  //              { ['value.ownValue']: { $exists: true } },
  //              { ['value.ownValue.enabled']: { $exists: true } },
  //              { ['value.ownValue.enabled']: true },
  //            ],
  //          },
  //        },
  //      },
  //      {
  //        $set: {
  //          ['fields.$.value.ownValue.enabled']: false,
  //          ['fields.$.meta.ownMeta.disabled']: true,
  //        },
  //      },
  //    );
  //  },
  //  async updateNotificationAt(
  //    taskId: string,
  //    notificationAt: Date,
  //    lastNotificationAt: Date,
  //  ): Promise<void> {
  //    await TaskModel.findByIdAndUpdate(taskId, {
  //      $set: {
  //        notificationAt,
  //        lastNotificationAt,
  //      },
  //    });
  //  },
};

export default taskApi;

export type TaskApi = typeof taskApi;
