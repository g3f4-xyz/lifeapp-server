import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../constants';
import { TaskFieldsSchemaPath } from './TaskModel';

// @ts-ignore
export const ChoiceFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.CHOICE,
  new Schema({
      value: {
        id: {
          type: String,
          default: '',
        },
      },
      meta: {
        fieldType: String,
        disabled: Boolean,
        required: Boolean,
        label: String,
        helperText: String,
        options: [{
          text: String,
          value: String,
        }],
        defaultValue: String,
      },
    },
  ),
);
