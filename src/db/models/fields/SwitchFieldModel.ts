import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const SwitchFieldSchema = new Schema({
  value: {
    enabled: {
      type: Boolean,
      default: false,
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
  },
});

SwitchFieldSchema.methods.validateField = function() {
  console.log(['SwitchFieldSchema.methods.validateField']);
  return Boolean(this);
};

// @ts-ignore
export const SwitchFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.SWITCH,
  SwitchFieldSchema,
);
