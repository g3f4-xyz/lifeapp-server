import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../../constants';
import { Field } from '../../../interfaces';
import {
  lengthValidator,
  requiredValidator,
} from '../../../utils/fieldValidators';
import iterateValidations from '../../../utils/iterateValidations';
import { TaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { FieldDocument } from '../FieldConfigModel';

const TextFieldSchema = new Schema<Field>({
  order: {
    type: Number,
    required: true,
  },
  value: {
    text: {
      type: String,
      default: '',
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
      default: false,
    },
    helperText: String,
    minLength: Number,
    maxLength: Number,
    inputType: String,
  },
});

TextFieldSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

TextFieldSchema.set('toJSON', {
  virtuals: true,
});

TextFieldSchema.methods.validateField = function(): string[] {
  const validators = [
    requiredValidator(),
    lengthValidator(this.meta.minLength, this.meta.maxLength),
  ];

  return iterateValidations(this.value.text, validators);
};

export const TextFieldModel: Model<
  FieldDocument
> = ((TaskFieldsSchema as unknown) as Model<TaskDocument>).discriminator(
  FIELD_TYPE.TEXT,
  TextFieldSchema,
);
