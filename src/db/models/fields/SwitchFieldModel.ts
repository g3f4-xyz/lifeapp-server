import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const SwitchFieldSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  value: {
    enabled: {
      type: Boolean,
      default: false,
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
    helperText: String,
  },
});

SwitchFieldSchema.methods.validateField = function(): string | null {
  console.log(['SwitchFieldSchema.methods.validateField'], this);
  return null;
};

// @ts-ignore
export const SwitchFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.SWITCH,
  SwitchFieldSchema,
);
