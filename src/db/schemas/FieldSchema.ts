import { Schema } from 'mongoose';
import { IField } from '../interfaces';
import { FieldMetaSchema } from './FieldMetaSchema';
import { FieldValueSchema } from './FieldValueSchema';

const FIELD_DEFINITION = {
  _id: Schema.Types.ObjectId,
  fieldId: String,
  fieldType: String,
  order: Number,
  meta: FieldMetaSchema,
  value: FieldValueSchema,
};

export const FieldSchema: Schema<IField> = new Schema(FIELD_DEFINITION);
