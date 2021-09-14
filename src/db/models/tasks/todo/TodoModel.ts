import { Schema } from 'mongoose';
import { TaskTypeId } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const TodoSchema: Schema<TaskDocument> = new Schema({});

TodoSchema.methods.validateFields = function() {
  return this.fields.every(field => field.validateField());
};

export const TodoModel = TaskModel.discriminator<TaskDocument>(
  TaskTypeId.TODO,
  TodoSchema,
);
