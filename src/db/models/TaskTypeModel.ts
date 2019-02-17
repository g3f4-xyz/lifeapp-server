import { Document, model, Model, Schema } from 'mongoose';

import { ITaskType } from '../interfaces';

export interface ITaskTypeDocument extends ITaskType, Document {}

export const TaskTypeSchema: Schema<ITaskType> = new Schema({
  typeId: String,
  label: String,
  description: String,
  order: Number,
  parentTypeIds: [String],
  fieldsIds: [String],
});

export const TaskTypeModel: Model<ITaskTypeDocument> = model('TaskType', TaskTypeSchema);
