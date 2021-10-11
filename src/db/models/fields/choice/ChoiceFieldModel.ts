import { Model, Schema } from 'mongoose';
import { FieldType } from '../../../../constants';
import { requiredValidator } from '../../../utils/fieldValidators';
import parseId from '../../parseId';
import { TaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { FieldDocument } from '../FieldConfigModel';

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
      type: [
        {
          text: String,
          value: String,
        },
      ],
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

ChoiceFieldSchema.virtual('id').get(parseId);

ChoiceFieldSchema.set('toJSON', {
  virtuals: true,
});

ChoiceFieldSchema.methods.validateField = function(): string[] {
  const { required, disabled } = this.meta;
  const validator = requiredValidator();

  return required && !disabled ? [validator(this.value.id)] : [];
};

export const ChoiceFieldModel: Model<
  FieldDocument
> = ((TaskFieldsSchema as unknown) as Model<TaskDocument>).discriminator(
  FieldType.CHOICE,
  ChoiceFieldSchema,
);
