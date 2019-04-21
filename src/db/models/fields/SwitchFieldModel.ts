import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

// @ts-ignore
export const SwitchFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.SWITCH,
  new Schema({
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
    },
  ),
);
