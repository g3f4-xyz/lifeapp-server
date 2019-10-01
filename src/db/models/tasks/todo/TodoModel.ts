import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const TodoSchema: Schema<TaskDocument> = new Schema({});

TodoSchema.methods.validateFields = function() {
  console.log(['TodoSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const TodoModel = TaskModel.discriminator<TaskDocument>(
  TASK_TYPE.TODO,
  TodoSchema,
);
