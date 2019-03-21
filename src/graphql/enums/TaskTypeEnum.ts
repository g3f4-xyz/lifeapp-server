import { GraphQLEnumType } from 'graphql';
import { TASK_TYPE } from '../../constants';

export const TaskTypeEnum = new GraphQLEnumType({
  name: 'TaskTypeEnum',
  values: Object.keys(TASK_TYPE).reduce((acc, value) => ({ ...acc, [value]: { value }}), {}),
});
