import { Schema } from 'mongoose';
import { TaskTypeId } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const RoutineSchema: Schema<TaskDocument> = new Schema({});

RoutineSchema.methods.validateFields = function() {
  return this.fields.every(field => field.validateField());
};

export const RoutineModel = TaskModel.discriminator<TaskDocument>(
  TaskTypeId.ROUTINE,
  RoutineSchema,
);
