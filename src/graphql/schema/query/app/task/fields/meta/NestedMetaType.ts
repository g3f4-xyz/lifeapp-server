import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';
import { ValuesUnion } from '../value/ValuesUnion';
import { MetasUnion } from './MetasUnion';

export const NestedMetaType: GraphQLObjectType<FieldMeta, Context> = new GraphQLObjectType({
  name: 'NestedMetaType',
  description: 'nested meta type',
  fields: () => ({
    fieldType: {
      description: 'fieldType description',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    parentValue: {
      description: 'parentValue description',
      type: ValuesUnion,
    },
    ownMeta: {
      description: 'ownMeta description',
      type: MetasUnion,
    },
    childrenMeta: {
      description: 'childrenMeta description',
      type: new GraphQLList(NestedMetaType),
    },
  }),
});
