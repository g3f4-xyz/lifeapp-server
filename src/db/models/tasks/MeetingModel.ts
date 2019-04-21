import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, ITaskModel, TaskModel } from './TaskModel';

const MeetingSchema: Schema<ITaskDocument> = new Schema({});
MeetingSchema.statics.addOne = (ownerId: string) => {
  return new MeetingModel({
    ownerId,
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
export const MeetingModel: ITaskModel = TaskModel.discriminator(
  TASK_TYPE.MEETING,
  MeetingSchema,
);
