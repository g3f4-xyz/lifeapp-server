import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Context, Field } from '../../../../../../db/interfaces';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { TextMetaType } from './meta/TextMetaType';
import { TextValueType } from './value/TextValueType';

export const TextFieldType: GraphQLObjectType<
  Field,
  Context
> = new GraphQLObjectType<Field, Context>({
  name: 'TextFieldType',
  description: 'text field type',
  fields: () => ({
    id: globalIdField('TextFieldType', ({ _id }) => _id),
    fieldId: {
      description: 'fieldId field description',
      type: new GraphQLNonNull(FieldIdEnum),
    },
    order: {
      description: 'order field description',
      type: new GraphQLNonNull(GraphQLInt),
    },
    fieldType: {
      description: 'field type description',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    value: {
      description: 'text value field description',
      type: new GraphQLNonNull(TextValueType),
    },
    meta: {
      description: 'text meta field description',
      type: new GraphQLNonNull(TextMetaType),
      resolve(field) {
        const { fieldType, meta } = field;

        return { ...meta, fieldType };
      },
    },
  }),
  interfaces: [nodeInterface],
});
