import { Schema } from 'mongoose';

import { ITaskField } from '../interfaces';

export const FieldSchema: Schema<ITaskField> = new Schema({
  fieldId: String,
  type: String,
  order: Number,
  label: String,
  helperText: String,
  meta: Object,
  // TODO ogarnąć dlaczego schema psuje się
  // meta: {
  //   type: String,
  //   required: Boolean,
  //   minLength: Number,
  //   maxLength: Number,
  //   min: Number,
  //   max: Number,
  //   options: [{
  //     text: String,
  //     value: String,
  //   }],
  //   defaultValue: String,
  // },
  value: {
    enabled: Boolean,
    id: String,
    text: String,
    ids: [String],
  },
});
