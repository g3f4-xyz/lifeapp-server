import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../constants';
import { TaskFieldsSchemaPath } from '../tasks/TaskModel';

const NestedFieldSchema = new Schema({
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
      fieldType: String,
      parentValue: {
        id: String,
        enabled: Boolean,
        text: String,
      },
      ownMeta: this,
      childrenMeta: [this],
    },
  },
);

NestedFieldSchema.methods.validateField = function() {
  console.log(['NestedFieldSchema.methods.validateField']);
  return Boolean(this);
};

// @ts-ignore
export const NestedFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.NESTED,
  NestedFieldSchema,
);
