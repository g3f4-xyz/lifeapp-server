import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context, FieldMeta } from '../../../../../../../db/interfaces';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';
import { ValuesUnion } from '../value/ValuesUnion';
import { MetasUnion } from './MetasUnion';

export const NestedMetaType: GraphQLObjectType<
  FieldMeta,
  Context
> = new GraphQLObjectType({
  name: 'NestedFieldMeta',
  fields: () => ({
    fieldType: {
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    parentValue: {
      type: ValuesUnion,
    },
    ownMeta: {
      type: MetasUnion,
    },
    childrenMeta: {
      type: new GraphQLList(NestedMetaType),
    },
  }),
});
