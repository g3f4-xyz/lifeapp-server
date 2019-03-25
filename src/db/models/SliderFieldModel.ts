import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../constants';
import { TaskFieldsSchemaPath } from './TaskModel';

// @ts-ignore
export const SliderFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.SLIDER,
  new Schema({
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
      label: String,
      helperText: String,
    },
  }),
);
