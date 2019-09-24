import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../../constants';
import { IField } from '../../../interfaces';
import { lengthValidator, requiredValidator } from '../../../utils/fieldValidators';
import iterateValidations from '../../../utils/iterateValidations';
import { ITaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { IFieldDocument } from '../FieldConfigModel';

const TextFieldSchema = new Schema<IField>({
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

TextFieldSchema.methods.validateField = function(): string | null {
  const validators = [
    requiredValidator(),
    lengthValidator(this.meta.minLength, this.meta.maxLength),
  ];

  return iterateValidations(this.value.text, validators);
};

export const TextFieldModel: Model<IFieldDocument> = (TaskFieldsSchema as unknown as Model<ITaskDocument>).discriminator(
  FIELD_TYPE.TEXT,
  TextFieldSchema,
);
