import { GraphQLEnumType } from 'graphql';
import { TASK_STATUS } from '../../../constants';

export const TaskStatusEnum = new GraphQLEnumType({
  name: 'TaskStatusEnum',
  values: Object.keys(TASK_STATUS).reduce((acc, value) => ({ ...acc, [value]: { value }}), {}),
});
