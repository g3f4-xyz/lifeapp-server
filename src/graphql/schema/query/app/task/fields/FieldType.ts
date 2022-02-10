import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Field } from '../../../../../../db/interfaces';
import { FieldIdEnum } from '../../../../../enums/FieldIdEnum';
import { FieldTypeEnum } from '../../../../../enums/FieldTypeEnum';
import { MetasUnion } from './meta/MetasUnion';
import { ValuesUnion } from './value/ValuesUnion';

export const FieldType = new GraphQLObjectType({
  name: 'Field',
  fields: () => ({
    id: globalIdField('Field'),
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    fieldType: {
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    value: {
      type: new GraphQLNonNull(ValuesUnion),
    },
    meta: {
      type: new GraphQLNonNull(MetasUnion),
      resolve(field) {
        const { fieldType, meta } = field;

        return { ...meta, fieldType };
      },
    },
    validationErrors: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
  }),
});
