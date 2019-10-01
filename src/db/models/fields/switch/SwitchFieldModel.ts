import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../../constants';
import { TaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { FieldDocument } from '../FieldConfigModel';

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
    required: {
      type: Boolean,
      default: true,
    },
    helperText: String,
  },
});

// tslint:disable-next-line:only-arrow-functions
SwitchFieldSchema.methods.validateField = function(): string[] {
  return [];
};

export const SwitchFieldModel: Model<FieldDocument> = (TaskFieldsSchema as unknown as Model<TaskDocument>).discriminator(
  FIELD_TYPE.SWITCH,
  SwitchFieldSchema,
);
