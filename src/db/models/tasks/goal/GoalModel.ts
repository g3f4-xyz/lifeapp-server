import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const GoalSchema: Schema<TaskDocument> = new Schema({});

GoalSchema.methods.validateFields = function() {
  console.log(['GoalSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const GoalModel = TaskModel.discriminator<TaskDocument>(
  TASK_TYPE.GOAL,
  GoalSchema,
);
