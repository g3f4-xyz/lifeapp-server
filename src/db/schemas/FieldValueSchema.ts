import { Schema } from 'mongoose';
import { IFieldValue } from '../interfaces';

const FIELD_VALUE_DEFINITION = {
  enabled: Boolean,
  id: String,
  text: String,
  ownValue: this,
  childrenValue: this,
};

export const FieldValueSchema: Schema<IFieldValue> = new Schema(FIELD_VALUE_DEFINITION);
