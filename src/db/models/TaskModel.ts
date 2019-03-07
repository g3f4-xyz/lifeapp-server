import { Document, Model, model, Schema} from 'mongoose';
import * as moment from 'moment-timezone';

import { ITask } from '../interfaces';
import { FieldSchema } from './FieldSchema';

export interface ITaskDocument extends ITask, Document {}

export const TaskSchema: Schema<ITaskDocument> = new Schema({
  ownerId: {
    required: true,
    type: String,
  },
  taskType: {
    required: true,
    type: String,
  },
  updatedAt: {
    type: String,
  },
  fields: {
    required: true,
    type: [FieldSchema],
  },
});

TaskSchema.pre('findOneAndUpdate', function() {
  this.update({},{ $set: { updatedAt: moment(new Date()).toISOString() } });
});

export const TaskModel: Model<ITaskDocument> = model('Task', TaskSchema);
