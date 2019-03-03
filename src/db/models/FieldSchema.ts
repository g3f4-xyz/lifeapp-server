import { Document, model, Model, Schema } from 'mongoose';
import { IField } from '../interfaces';
import { FieldMetaSchema } from '../schemas/FieldMetaSchema';

export interface IFieldDocument extends IField, Document {}

const FIELD_VALUE_DEFINITION = {
  enabled: Boolean,
  id: String,
  text: String,
  ownValue: this,
  childrenValue: this,
};

const FIELD_DEFINITION = {
  _id: Schema.Types.ObjectId,
  fieldId: String,
  fieldType: String,
  order: Number,
  meta: FieldMetaSchema,
  value: FIELD_VALUE_DEFINITION,
};

export const FieldSchema: Schema<IField> = new Schema(FIELD_DEFINITION);

export const FieldModel: Model<IFieldDocument> = model('Field', FieldSchema);
