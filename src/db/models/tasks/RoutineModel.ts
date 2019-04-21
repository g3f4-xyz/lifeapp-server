import { Schema } from 'mongoose';
import { TASK_TYPE } from '../../../constants';
import { FIELDS_CONFIG, ITaskDocument, ITaskModel, TaskModel } from './TaskModel';

const RoutineSchema: Schema<ITaskDocument> = new Schema({});
RoutineSchema.statics.addOne = (ownerId: string) => {
  return new RoutineModel({
    ownerId,
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
export const RoutineModel: ITaskModel = TaskModel.discriminator(
  TASK_TYPE.ROUTINE,
  RoutineSchema,
);
