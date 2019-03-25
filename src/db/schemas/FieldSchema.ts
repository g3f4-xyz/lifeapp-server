import { Schema } from 'mongoose';
import { FIELD_ID, FIELD_TYPE } from '../../constants';
import { IField } from '../interfaces';
import { FieldMetaSchema } from './FieldMetaSchema';
// import { FieldValueSchema } from './FieldValueSchema';

export const FIELD_DEFINITION = {
  _id: Schema.Types.ObjectId,
  fieldId: {
    type: String,
    enum: Object.values(FIELD_ID),
  },
  fieldType: {
    type: String,
    enum: Object.values(FIELD_TYPE),
  },
  order: {
    type: Number,
    default: 0,
  },
  meta: FieldMetaSchema,
  // value: FieldValueSchema,
};

export const FieldSchema: Schema<IField> = new Schema(FIELD_DEFINITION, { discriminatorKey: 'fieldType' });
