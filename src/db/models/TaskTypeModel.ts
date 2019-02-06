import { Document, model, Model, Schema } from 'mongoose';

import { ITaskType } from '../interfaces';
import { FieldSchema } from '../schemas/FieldSchema';

export interface ITaskTypeDocument extends ITaskType, Document {}

export const TaskTypeSchema: Schema<ITaskType> = new Schema({
  name: String,
  typeId: String,
  description: String,
  order: Number,
  parentID: [String],
  fields: [FieldSchema],
});

export const TaskTypeModel: Model<ITaskTypeDocument> = model('TaskType', TaskTypeSchema);
