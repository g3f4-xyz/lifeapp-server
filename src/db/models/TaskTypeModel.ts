import { Document, model, Model, Schema } from 'mongoose';

import { TaskType } from '../interfaces';

export interface TaskTypeDocument extends TaskType, Document {}

export const TaskTypeSchema: Schema<TaskType> = new Schema({
  typeId: String,
  label: String,
  description: String,
  order: Number,
  parentTypeIds: [String],
  fieldsIds: [String],
});

export const TaskTypeModel: Model<TaskTypeDocument> = model('TaskType', TaskTypeSchema);
