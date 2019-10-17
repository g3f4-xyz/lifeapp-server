import { Document, model, Model, Schema } from 'mongoose';

import { TaskType } from '../interfaces';

export const TaskTypeSchema: Schema<TaskType> = new Schema({
  typeId: String,
  label: String,
  description: String,
  order: Number,
  parentTypeIds: [String],
  fieldsIds: [String],
});

TaskTypeSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TaskTypeSchema.set('toJSON', {
  virtuals: true,
});

export const TaskTypeModel: Model<TaskType & Document> = model(
  'TaskType',
  TaskTypeSchema,
);
