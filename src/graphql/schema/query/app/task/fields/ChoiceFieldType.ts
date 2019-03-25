import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IContext, IField } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { ChoiceMetaType } from './meta/ChoiceMetaType';
import { ChoiceValueType } from './value/ChoiceValueType';

export const ChoiceFieldType: GraphQLObjectType<IField, IContext> = new GraphQLObjectType<IField, IContext>({
  name: 'ChoiceFieldType',
  description: 'choice field type',
  fields: () => ({
    id: globalIdField('ChoiceFieldType', ({ _id }) => _id),
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
      description: 'choice value field description',
      type: new GraphQLNonNull(ChoiceValueType),
    },
    meta: {
      description: 'choice meta field description',
      type: new GraphQLNonNull(ChoiceMetaType),
      resolve(field) {
        const { fieldType, meta } = field;

        return ({ ...meta, fieldType });
      },
    },
  }),
  interfaces: [nodeInterface],
});