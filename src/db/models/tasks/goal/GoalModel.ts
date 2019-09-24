import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { ITaskDocument, TaskModel } from '../TaskModel';

const GoalSchema: Schema<ITaskDocument> = new Schema({});

GoalSchema.methods.validateFields = function() {
  console.log(['GoalSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const GoalModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.GOAL,
  GoalSchema,
);