import { Document, model, Model, Schema } from 'mongoose';
import { IField } from '../interfaces';
import { FieldMetaSchema } from '../schemas/FieldMetaSchema';
import { FieldValueSchema } from '../schemas/FieldValueSchema';

export interface IFieldDocument extends IField, Document {}

const FIELD_DEFINITION = {
  _id: Schema.Types.ObjectId,
  fieldId: String,
  fieldType: String,
  order: Number,
  meta: FieldMetaSchema,
  value: FieldValueSchema,
};

export const FieldSchema: Schema<IField> = new Schema(FIELD_DEFINITION);

export const FieldModel: Model<IFieldDocument> = model('Field', FieldSchema);
