import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskModel, TaskModel } from './TaskModel';

const EventSchema = new Schema({});
EventSchema.statics.addOne = (ownerId: string) => {
  return new EventModel({
    ownerId,
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
export const EventModel: ITaskModel = TaskModel.discriminator(
  TASK_TYPE.EVENT,
  EventSchema,
);
