import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { IField } from '../../interfaces';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const TextFieldSchema = new Schema<IField>({
  value: {
    text: {
      type: String,
      default: '',
    },
  },
  meta: {
    fieldType: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    label: String,
    helperText: String,
    minLength: Number,
    maxLength: Number,
    inputType: String,
  },
});

TextFieldSchema.methods.validateField = function() {
  console.log(['TextFieldSchema.methods.validateField']);
  return Boolean(this);
};

// @ts-ignore
export const TextFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.TEXT,
  TextFieldSchema,
);
