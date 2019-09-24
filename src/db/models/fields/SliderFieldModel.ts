import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const SliderFieldSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  value: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  meta: {
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
    label: {
      type: String,
      required: true,
    },
    helperText: String,
  },
});

const progressValidator = (
  min: number,
  max: number,
  errorMessage: string = `wartość w przedziale od ${min} do ${max}.`,
) => (value: number) => {
  if (value < min || value > max) {
    return errorMessage;
  }

  return null;
};

SliderFieldSchema.methods.validateField = function(): string | null {
  console.log(['SliderFieldSchema.methods.validateField']);
  const validator = progressValidator(this.meta.min, this.meta.max);

  return validator(this.value.progress);
};

// @ts-ignore
export const SliderFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.SLIDER,
  SliderFieldSchema,
);
