import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const RoutineSchema: Schema<TaskDocument> = new Schema({});

RoutineSchema.methods.validateFields = function() {
  console.log(['RoutineSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const RoutineModel = TaskModel.discriminator<TaskDocument>(
  TASK_TYPE.ROUTINE,
  RoutineSchema,
);
