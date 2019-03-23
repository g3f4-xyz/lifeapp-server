import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, IField } from '../../../../../../db/interfaces';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { TextMetaType } from '../../../../../unions/MetasUnion/TextMetaType';
import { TextValueType } from '../../../../../unions/ValuesUnion/TextValueType';

export const TextFieldType: GraphQLObjectType<IField, IContext> = new GraphQLObjectType<IField, IContext>({
  name: 'TextFieldType',
  description: 'text field type',
  fields: () => ({
    id: globalIdField('TextFieldType', ({ _id, fieldId }) => `${_id}|${fieldId}`),
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

        return ({ ...meta, fieldType });
      },
    },
  }),
  interfaces: [nodeInterface],
});
