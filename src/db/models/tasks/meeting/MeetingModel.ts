import { Schema } from 'mongoose';
import { TaskTypeId } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const MeetingSchema: Schema<TaskDocument> = new Schema({});

MeetingSchema.methods.validateFields = function() {
  return this.fields.every(field => field.validateField());
};

export const MeetingModel = TaskModel.discriminator<TaskDocument>(
  TaskTypeId.MEETING,
  MeetingSchema,
);
