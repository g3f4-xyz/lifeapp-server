import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, IField } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { SwitchMetaType } from '../../../../../unions/MetasUnion/SwitchMetaType';
import { SwitchValueType } from '../../../../../unions/ValuesUnion/SwitchValueType';

export const SwitchFieldType: GraphQLObjectType<IField, IContext> = new GraphQLObjectType<IField, IContext>({
  name: 'SwitchFieldType',
  description: 'switch field type',
  fields: () => ({
    id: globalIdField('SwitchFieldType', ({ _id, fieldId }) => `${_id}|${fieldId}`),
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
      description: 'switch value field description',
      type: new GraphQLNonNull(SwitchValueType),
    },
    meta: {
      description: 'switch meta field description',
      type: new GraphQLNonNull(SwitchMetaType),
      resolve(field) {
        const { fieldType, meta } = field;

        return ({ ...meta, fieldType });
      },
    },
  }),
  interfaces: [nodeInterface],
});
