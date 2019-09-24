import { Schema } from 'mongoose';
import { FIELD_ID, FIELD_TYPE } from '../../constants';
import { IField } from '../interfaces';

export const FIELD_DEFINITION = {
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
  meta: Object,
  value: Object,
};

export const FieldSchema: Schema<IField> = new Schema(FIELD_DEFINITION, { discriminatorKey: 'fieldType' });
