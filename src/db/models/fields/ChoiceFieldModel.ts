import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const ChoiceFieldSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  value: {
    id: {
      type: String,
      default: '',
    },
  },
  meta: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: [{
        text: String,
        value: String,
      }],
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
    defaultValue: String,
  },
});

ChoiceFieldSchema.methods.validateField = function(): string | null {
  console.log(['ChoiceFieldSchema.methods.validateField']);
  return null;
};

// @ts-ignore
export const ChoiceFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.CHOICE,
  ChoiceFieldSchema,
);
