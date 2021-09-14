import { GraphQLEnumType } from 'graphql';
import { TaskTypeId } from '../../constants';

export const TaskTypeEnum = new GraphQLEnumType({
  name: 'TaskTypeId',
  values: Object.keys(TaskTypeId).reduce(
    (acc, value) => ({ ...acc, [value]: { value } }),
    {},
  ),
});
