import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { IField } from '../../interfaces';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const TextFieldSchema = new Schema<IField>({
  order: {
    type: Number,
    required: true,
  },
  value: {
    text: {
      type: String,
      default: '',
    },
  },
  meta: {
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    helperText: String,
    minLength: Number,
    maxLength: Number,
    inputType: String,
  },
});

const lengthValidator = (
  min: number,
  max: number,
  errorMessage: string = `od ${min} do ${max} znaków.`,
) => (value: string) => {
  if (value.length < min || value.length > max) {
    return errorMessage;
  }

  return null;
};

TextFieldSchema.methods.validateField = function(): string | null {
  const validator = lengthValidator(this.meta.minLength, this.meta.maxLength);

  return validator(this.value.text);
};

// @ts-ignore
export const TextFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.TEXT,
  TextFieldSchema,
);
