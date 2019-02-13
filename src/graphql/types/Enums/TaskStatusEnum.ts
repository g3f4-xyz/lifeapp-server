import { GraphQLEnumType } from 'graphql';

export const TaskStatusEnum = new GraphQLEnumType({
  name: 'TaskStatusEnum',
  values: {
    TODO: {
      value: 'TODO',
    },
    DONE: {
      value: 'DONE',
    },
    IN_PROGRESS: {
      value: 'IN_PROGRESS',
    },
  },
});
