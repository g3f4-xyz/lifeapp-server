import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Context, Field } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { SwitchMetaType } from './meta/SwitchMetaType';
import { SwitchValueType } from './value/SwitchValueType';

export const SwitchFieldType: GraphQLObjectType<
  Field,
  Context
> = new GraphQLObjectType<Field, Context>({
  name: 'SwitchFieldType',
  description: 'switch field type',
  fields: () => ({
    id: globalIdField('SwitchFieldType'),
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

        return { ...meta, fieldType };
      },
    },
  }),
  interfaces: [nodeInterface],
});
