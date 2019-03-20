import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { FieldTypeEnum } from '../../enums/FieldTypeEnum';

export const TextMetaType = new GraphQLObjectType({
  name: 'TextMetaType',
  description: 'text meta type',
  fields: () => ({
    fieldType: {
      description: 'fieldType',
      type: new GraphQLNonNull(FieldTypeEnum),
    },
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    minLength: {
      description: 'minLength',
      type: GraphQLInt,
    },
    maxLength: {
      description: 'maxLength',
      type: GraphQLInt,
    },
    min: {
      description: 'min',
      type: GraphQLInt,
    },
    max: {
      description: 'max',
      type: GraphQLInt,
    },
    inputType: {
      description: 'inputType field description',
      type: GraphQLString,
    },
    label: {
      description: 'label field description',
      type: new GraphQLNonNull(GraphQLString),
    },
    helperText: {
      description: 'helperText field description',
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
