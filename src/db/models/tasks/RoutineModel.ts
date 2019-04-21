import { Model, Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, TaskModel } from './TaskModel';

const RoutineSchema: Schema<ITaskDocument> = new Schema({});
RoutineSchema.statics.addOne = () => {
  return new RoutineModel({
    fields: [
      FIELDS_CONFIG.TITLE,
      FIELDS_CONFIG.PRIORITY,
      FIELDS_CONFIG.STATUS,
      FIELDS_CONFIG.CYCLE,
      FIELDS_CONFIG.ACTION,
      FIELDS_CONFIG.NOTIFICATIONS,
    ],
  });
};

// @ts-ignore
export const RoutineModel: Model<ITaskDocument> = TaskModel.discriminator(
  TASK_TYPE.ROUTINE,
  RoutineSchema,
);
