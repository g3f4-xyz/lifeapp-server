import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

// @ts-ignore
export const TextFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.TEXT,
  new Schema({
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
    },
  ),
);
