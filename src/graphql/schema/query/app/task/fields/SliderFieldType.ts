import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, IField } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { SliderMetaType } from '../../../../../unions/MetasUnion/SliderMetaType';
import { SliderValueType } from '../../../../../unions/ValuesUnion/SliderValueType';

export const SliderFieldType: GraphQLObjectType<IField, IContext> = new GraphQLObjectType<IField, IContext>({
  name: 'SliderFieldType',
  description: 'slider field type',
  fields: () => ({
    id: globalIdField('SliderFieldType', ({ _id, fieldId }) => `${_id}|${fieldId}`),
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
      description: 'slider value field description',
      type: new GraphQLNonNull(SliderValueType),
    },
    meta: {
      description: 'slider meta field description',
      type: new GraphQLNonNull(SliderMetaType),
      resolve(field) {
        const { fieldType, meta } = field;

        return ({ ...meta, fieldType });
      },
    },
  }),
  interfaces: [nodeInterface],
});
