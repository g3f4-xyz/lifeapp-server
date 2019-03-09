import { Schema } from 'mongoose';
import { IFieldMeta } from '../interfaces';

const FIELD_META_DEFINITION = {
  // TODO ogarnąć dlaczego to psuje scheme
  fieldType: String,
  disabled: Boolean,
  required: Boolean,
  minLength: Number,
  maxLength: Number,
  min: Number,
  max: Number,
  inputType: String,
  label: String,
  helperText: String,
  options: [{
    text: String,
    value: String,
  }],
  defaultValue: String,
  parentValue: {
    id: String,
    enabled: Boolean,
    text: String,
  },
  ownMeta: this,
  childrenMeta: [this],
};

export const FieldMetaSchema: Schema<IFieldMeta> = new Schema(FIELD_META_DEFINITION);
