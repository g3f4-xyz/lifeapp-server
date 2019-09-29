import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../../constants';
import { progressValidator } from '../../../utils/fieldValidators';
import iterateValidations from '../../../utils/iterateValidations';
import { ITaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { IFieldDocument } from '../FieldConfigModel';

const SliderFieldSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  value: {
    progress: {
      type: Number,
      default: 0,
    },
  },
  meta: {
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
    step: {
      type: Number,
      default: 1,
    },
    label: {
      type: String,
      required: true,
    },
    helperText: String,
  },
});

SliderFieldSchema.methods.validateField = function(): string[] {
  const validators = [
    progressValidator(this.meta.min, this.meta.max),
  ];

  return iterateValidations(this.value.progress, validators);
};

export const SliderFieldModel: Model<IFieldDocument> = (TaskFieldsSchema as unknown as Model<ITaskDocument>).discriminator(
  FIELD_TYPE.SLIDER,
  SliderFieldSchema,
);
