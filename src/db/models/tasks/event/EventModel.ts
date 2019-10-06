import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const EventSchema: Schema<TaskDocument> = new Schema({});

EventSchema.methods.validateFields = function() {
  return this.fields.every(field => field.validateField());
};

export const EventModel = TaskModel.discriminator<TaskDocument>(
  TASK_TYPE.EVENT,
  EventSchema,
);
