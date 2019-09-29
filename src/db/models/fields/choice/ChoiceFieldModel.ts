import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../../constants';
import { requiredValidator } from '../../../utils/fieldValidators';
import { ITaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { IFieldDocument } from '../FieldConfigModel';

const ChoiceFieldSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  value: {
    id: {
      type: String,
      default: '',
    },
  },
  meta: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: [{
        text: String,
        value: String,
      }],
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    helperText: String,
    defaultValue: String,
  },
});

ChoiceFieldSchema.methods.validateField = function(): string[] {
  const { required, disabled } = this.meta;
  const validator = requiredValidator();

  return required && !disabled ? [validator(this.value.id)] : [];
};

export const ChoiceFieldModel: Model<IFieldDocument> = (TaskFieldsSchema as unknown as Model<ITaskDocument>).discriminator(
  FIELD_TYPE.CHOICE,
  ChoiceFieldSchema,
);
