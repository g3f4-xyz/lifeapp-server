import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Context, Field } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { SliderMetaType } from './meta/SliderMetaType';
import { SliderValueType } from './value/SliderValueType';

export const SliderFieldType: GraphQLObjectType<Field, Context> = new GraphQLObjectType<Field, Context>({
  name: 'SliderFieldType',
  description: 'slider field type',
  fields: () => ({
    id: globalIdField('SliderFieldType', ({ _id }) => _id),
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
