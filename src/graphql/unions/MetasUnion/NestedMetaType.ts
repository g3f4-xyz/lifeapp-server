import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IContext, IFieldMeta } from '../../../db/interfaces';
import { FieldTypeEnum } from '../../enums/FieldTypeEnum';
import { ValuesUnion } from '../ValuesUnion/ValuesUnion';
import { MetasUnion } from './MetasUnion';

export const NestedMetaType: GraphQLObjectType<IFieldMeta, IContext> = new GraphQLObjectType({
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
