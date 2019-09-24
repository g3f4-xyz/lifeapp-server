import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const NestedFieldSchema = new Schema({
  order: {
    type: Number,
    required: true,
  },
  value: {
    ownValue: {
      type: Object,
      default: null,
    },
    childrenValue: {
      type: Object,
      default: null,
    },
  },
  meta: {
    fieldType: {
      type: String,
      // required: true, TODO odkomentować i udrożnić testy
    },
    parentValue: {
      id: String,
      enabled: Boolean,
      text: String,
    },
    ownMeta: this,
    childrenMeta: [this],
  },
});

NestedFieldSchema.methods.validateField = function (): string | null {
  console.log(['NestedFieldSchema.methods.validateField'], this);
  return null;
};

// @ts-ignore
export const NestedFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.NESTED,
  NestedFieldSchema,
);
