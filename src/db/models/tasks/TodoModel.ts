import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { ITaskDocument, TaskModel } from './TaskModel';

const TodoSchema: Schema<ITaskDocument> = new Schema({});

TodoSchema.methods.validateFields = function() {
  console.log(['TodoSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const TodoModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.TODO,
  TodoSchema,
);
