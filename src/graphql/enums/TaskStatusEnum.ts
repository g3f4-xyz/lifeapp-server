import { GraphQLEnumType } from 'graphql';
import { TaskStatus } from '../../constants';

export const TaskStatusEnum = new GraphQLEnumType({
  name: 'TaskStatus',
  values: Object.keys(TaskStatus).reduce(
    (acc, value) => ({ ...acc, [value]: { value } }),
    {},
  ),
});
