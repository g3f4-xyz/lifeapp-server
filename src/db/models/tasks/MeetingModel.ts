import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { ITaskDocument, TaskModel } from './TaskModel';

const MeetingSchema: Schema<ITaskDocument> = new Schema({});

MeetingSchema.methods.validateFields = function() {
  console.log(['MeetingSchema.methods.validateFields'], this.fields.map(field => {
    console.log(['map.field'], field);
    field.validateField();
  }));
  return true;
};

export const MeetingModel = TaskModel.discriminator<ITaskDocument>(
  TASK_TYPE.MEETING,
  MeetingSchema,
);
