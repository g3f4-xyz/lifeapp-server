import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const SliderFieldSchema = new Schema({
  value: {
    progress: {
      type: Number,
      default: 0,
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
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    label: String,
    helperText: String,
  },
});

SliderFieldSchema.methods.validateField = function() {
  console.log(['SliderFieldSchema.methods.validateField'], this);
  return true;
};

// @ts-ignore
export const SliderFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.SLIDER,
  SliderFieldSchema,
);
