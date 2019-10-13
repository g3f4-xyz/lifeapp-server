import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Context, Field } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { nodeInterface } from '../../../../../nodeDefinitions';
import { ChoiceMetaType } from './meta/ChoiceMetaType';
import { ChoiceValueType } from './value/ChoiceValueType';

export const ChoiceFieldType: GraphQLObjectType<
  Field,
  Context
> = new GraphQLObjectType<Field, Context>({
  name: 'ChoiceFieldType',
  description: 'choice field type',
  fields: () => ({
    id: globalIdField('ChoiceFieldType'),
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

        return { ...meta, fieldType };
      },
    },
    validationErrors: {
      description: 'choice field field validationErrors list',
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
  }),
  interfaces: [nodeInterface],
});
