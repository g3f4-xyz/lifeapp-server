import { Schema } from 'mongoose';
import { FIELD_TYPE } from '../../constants';
import { TaskFieldsSchemaPath } from './TaskModel';

// @ts-ignore
export const NestedFieldModel = TaskFieldsSchemaPath.discriminator(
  FIELD_TYPE.NESTED,
  new Schema({
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
  ),
);
