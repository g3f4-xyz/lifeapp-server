import { Model, Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, TaskModel } from './TaskModel';

const GoalSchema: Schema<ITaskDocument> = new Schema({});
GoalSchema.statics.addOne = () => {
  return new GoalModel({
    fields: [
      FIELDS_CONFIG.TITLE,
      FIELDS_CONFIG.PRIORITY,
      FIELDS_CONFIG.STATUS,
      FIELDS_CONFIG.PROGRESS,
      FIELDS_CONFIG.NOTIFICATIONS,
    ],
  });
};

// @ts-ignore
export const GoalModel: Model<ITaskDocument> = TaskModel.discriminator(
  TASK_TYPE.GOAL,
  GoalSchema,
);
