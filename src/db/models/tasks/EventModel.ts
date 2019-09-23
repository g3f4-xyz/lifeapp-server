import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { ITaskDocument, TaskModel } from './TaskModel';

const EventSchema: Schema<ITaskDocument> = new Schema({});

EventSchema.methods.validateFields = function() {
  console.log(['EventSchema.methods.validateFields']);
  return this.fields.every(field => field.validateField());
};

export const EventModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.EVENT,
  EventSchema,
);
