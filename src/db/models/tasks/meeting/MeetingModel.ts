import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../../constants';
import { TaskDocument, TaskModel } from '../TaskModel';

const MeetingSchema: Schema<TaskDocument> = new Schema({});

MeetingSchema.methods.validateFields = function() {
  return this.fields.every(field => field.validateField());
};

export const MeetingModel = TaskModel.discriminator<TaskDocument>(
  TASK_TYPE.MEETING,
  MeetingSchema,
);
