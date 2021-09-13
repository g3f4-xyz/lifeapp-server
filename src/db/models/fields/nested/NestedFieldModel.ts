import { Model, Schema } from 'mongoose';
import { FieldType } from '../../../../constants';
import { TaskDocument, TaskFieldsSchema } from '../../tasks/TaskModel';
import { FieldDocument } from '../FieldConfigModel';

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

NestedFieldSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

NestedFieldSchema.set('toJSON', {
  virtuals: true,
});

// tslint:disable-next-line:only-arrow-functions
NestedFieldSchema.methods.validateField = function(): string[] {
  return [];
};

export const NestedFieldModel: Model<
  FieldDocument
> = ((TaskFieldsSchema as unknown) as Model<TaskDocument>).discriminator(
  FieldType.NESTED,
  NestedFieldSchema,
);
