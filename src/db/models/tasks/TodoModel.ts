import { Model, Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, TaskModel } from './TaskModel';

const TodoSchema: Schema<ITaskDocument> = new Schema({});
TodoSchema.statics.addOne = () => {
  return new GoalModel({
    fields: [
      FIELDS_CONFIG.TITLE,
      FIELDS_CONFIG.PRIORITY,
      FIELDS_CONFIG.STATUS,
      FIELDS_CONFIG.NOTE,
      FIELDS_CONFIG.NOTIFICATIONS,
    ],
  });
};

// @ts-ignore
export const GoalModel: Model<ITaskDocument> = TaskModel.discriminator(
  TASK_TYPE.TODO,
  TodoSchema,
);
