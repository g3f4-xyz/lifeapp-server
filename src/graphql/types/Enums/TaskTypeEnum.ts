import { GraphQLEnumType } from 'graphql';

export const TaskTypeEnum = new GraphQLEnumType({
  name: 'TaskTypeEnum',
  values: {
    EVENT: {
      value: 'EVENT',
    },
    MEETING: {
      value: 'MEETING',
    },
    ROUTINE: {
      value: 'ROUTINE',
    },
    TODO: {
      value: 'TODO',
    },
  },
});
