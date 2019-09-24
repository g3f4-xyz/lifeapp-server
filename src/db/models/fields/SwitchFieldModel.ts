import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { ITaskDocument, TaskFieldsSchema } from '../tasks/TaskModel';
import { IFieldDocument } from './FieldConfigModel';

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

// tslint:disable-next-line:only-arrow-functions
SwitchFieldSchema.methods.validateField = function(): string | null {
  return null;
};

export const SwitchFieldModel: Model<IFieldDocument> = (TaskFieldsSchema as unknown as Model<ITaskDocument>).discriminator(
  FIELD_TYPE.SWITCH,
  SwitchFieldSchema,
);
