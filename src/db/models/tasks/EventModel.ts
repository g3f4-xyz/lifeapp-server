import { Model, Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, TaskModel } from './TaskModel';

const EventSchema: Schema<ITaskDocument> = new Schema({});
EventSchema.statics.addOne = () => {
  return new EventModel({
    fields: [
      FIELDS_CONFIG.TITLE,
      FIELDS_CONFIG.PRIORITY,
      FIELDS_CONFIG.STATUS,
      FIELDS_CONFIG.NOTE,
      FIELDS_CONFIG.LOCATION,
      FIELDS_CONFIG.DATE,
      FIELDS_CONFIG.DURATION,
      FIELDS_CONFIG.NOTIFICATIONS,
    ],
  });
};

// @ts-ignore
export const EventModel: Model<ITaskDocument> = TaskModel.discriminator(
  TASK_TYPE.EVENT,
  EventSchema,
);
