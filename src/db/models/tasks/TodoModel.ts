import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { ITaskDocument, TaskModel } from './TaskModel';

const TodoSchema: Schema<ITaskDocument> = new Schema({});

TodoSchema.methods.validateFields = function() {
  console.log(['TodoSchema.methods.validateFields'], this.fields.map(field => {
    console.log(['map.field'], field);
    field.validateField();
  }));
  return true;
};

export const TodoModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.TODO,
  TodoSchema,
);
