import { GraphQLEnumType } from 'graphql';

export const FieldTypeEnum = new GraphQLEnumType({
  name: 'FieldTypeEnum',
  values: {
    TEXT: {
      value: 'TEXT',
    },
    SWITCH: {
      value: 'SWITCH',
    },
    CHOICE: {
      value: 'CHOICE',
    },
    NESTED_CHOICE: {
      value: 'NESTED_CHOICE',
    },
  },
});
