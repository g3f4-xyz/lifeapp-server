import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext, IFieldMeta } from '../../../db/interfaces';
import { FieldTypeEnum } from '../Enums/FieldTypeEnum';
import { MetasUnion } from './MetasUnion';

export const NestedChoiceMetaType: GraphQLObjectType<IFieldMeta, IContext> = new GraphQLObjectType({
  name: 'NestedChoiceMetaType',
  description: 'partial choice meta type',
  fields: () => ({
    fieldType: {
      description: 'fieldType description',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    parentValue: {
      description: 'parentValue description',
      type: GraphQLString,
    },
    ownMeta: {
      description: 'ownMeta description',
      type: MetasUnion,
    },
    childrenMeta: {
      description: 'childrenMeta description',
      type: new GraphQLList(new GraphQLObjectType({
        name: 'ChildrenMeta',
        description: '',
        fields: () => ({
          fieldType: {
            description: '',
            type: GraphQLString,
          },
          parentValue: {
            description: '',
            type: GraphQLString,
          },
          meta: {
            description: '',
            type: MetasUnion,
            resolve: (rootValue) => {
              const { fieldType, meta } = rootValue;

              return ({ ...meta, fieldType });
            },
          },
        }),
      })),
    },
  }),
});
