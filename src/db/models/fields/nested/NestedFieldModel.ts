import { Model, Schema } from 'mongoose';
import { FIELD_TYPE } from '../../../../constants';
import { ITaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { IFieldDocument } from '../FieldConfigModel';

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

// tslint:disable-next-line:only-arrow-functions
NestedFieldSchema.methods.validateField = function(): string | null {
  return null;
};

export const NestedFieldModel: Model<IFieldDocument> = (TaskFieldsSchema as unknown as Model<ITaskDocument>).discriminator(
  FIELD_TYPE.NESTED,
  NestedFieldSchema,
);