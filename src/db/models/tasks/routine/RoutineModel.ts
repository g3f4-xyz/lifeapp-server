import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { ITaskDocument, TaskModel } from '../TaskModel';

const RoutineSchema: Schema<ITaskDocument> = new Schema({});

RoutineSchema.methods.validateFields = function() {
  console.log(['RoutineSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const RoutineModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.ROUTINE,
  RoutineSchema,
);
