import { Schema } from 'mongoose';

import { ITaskField } from '../interfaces';

const TASK_META_DEFINITION = {
  // TODO ogarnąć dlaczego to psuje scheme
  // type: String,
  required: Boolean,
  minLength: Number,
  maxLength: Number,
  min: Number,
  max: Number,
  options: [{
    text: String,
    value: String,
  }],
  defaultValue: String,
  nestedMeta: this,
};

const TASK_VALUE_DEFINITION = {
  enabled: Boolean,
  id: String,
  text: String,
  nestedValue: this,
};

const TASK_DEFINITION = {
  fieldId: String,
  type: String,
  order: Number,
  label: String,
  helperText: String,
  meta: TASK_META_DEFINITION,
  value: TASK_VALUE_DEFINITION,
};

export const FieldSchema: Schema<ITaskField> = new Schema(TASK_DEFINITION);
