import { Document, Model, model, Schema} from 'mongoose';

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
  fields: {
    required: true,
    type: [FieldSchema],
  },
});

export const TaskModel: Model<ITaskDocument> = model('Task', TaskSchema);
