import { GraphQLEnumType } from 'graphql';

export const FieldFormatEnum = new GraphQLEnumType({
  name: 'FieldFormatEnum',
  values: {
    TEXT: {
      value: 'TEXT',
    },
    BOOL: {
      value: 'BOOL',
    },
    CHOICE: {
      value: 'CHOICE',
    },
    MULTIPLE_CHOICE_WITH_PARENT: {
      value: 'MULTIPLE_CHOICE_WITH_PARENT',
    },
  },
});
