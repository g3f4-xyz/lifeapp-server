import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { ITaskDocument, TaskModel } from './TaskModel';

const EventSchema: Schema<ITaskDocument> = new Schema({});

EventSchema.methods.validateFields = function() {
  console.log(['EventSchema.methods.validateFields'], this.fields.map(field => {
    console.log(['map.field'], field);
    field.validateField();
  }));
  return true;
};

export const EventModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.EVENT,
  EventSchema,
);
