import { Schema } from 'mongoose';
import { FieldId, FieldType } from '../../constants';
import { Field } from '../interfaces';

export const FIELD_DEFINITION = {
  fieldId: {
    type: String,
    enum: Object.values(FieldId),
  },
  fieldType: {
    type: String,
    enum: Object.values(FieldType),
  },
  order: {
    type: Number,
    default: 0,
  },
  meta: Object,
  value: Object,
};

export const FieldSchema: Schema<Field> = new Schema(FIELD_DEFINITION, {
  discriminatorKey: 'fieldType',
});
