import { Model, Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, TaskModel } from './TaskModel';

const MeetingSchema: Schema<ITaskDocument> = new Schema({});
MeetingSchema.statics.addOne = () => {
  return new MeetingModel({
    fields: [
      FIELDS_CONFIG.TITLE,
      FIELDS_CONFIG.PRIORITY,
      FIELDS_CONFIG.STATUS,
      FIELDS_CONFIG.NOTE,
      FIELDS_CONFIG.LOCATION,
      FIELDS_CONFIG.DATE_TIME,
      FIELDS_CONFIG.DURATION,
      FIELDS_CONFIG.PERSON,
      FIELDS_CONFIG.NOTIFICATIONS,
    ],
  });
};

// @ts-ignore
export const MeetingModel: Model<ITaskDocument> = TaskModel.discriminator(
  TASK_TYPE.MEETING,
  MeetingSchema,
);
