import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { FieldTypeEnum } from '../../../../../../enums/FieldTypeEnum';

export const TextMetaType = new GraphQLObjectType({
  name: 'TextFieldMeta',
  fields: () => ({
    fieldType: {
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    required: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    minLength: {
      type: GraphQLInt,
    },
    maxLength: {
      type: GraphQLInt,
    },
    min: {
      type: GraphQLInt,
    },
    max: {
      type: GraphQLInt,
    },
    inputType: {
      type: GraphQLString,
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    helperText: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
