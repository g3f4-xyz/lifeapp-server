import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Task } from '../../../../../db/interfaces';
import { TaskTypeEnum } from '../../../../enums/TaskTypeEnum';
import { nodeInterface } from '../../../../nodeDefinitions';
import { FieldsUnion } from './fields/FieldsUnion';

export const TaskType = new GraphQLObjectType<Task>({
  name: 'TaskType',
  description: 'task type',
  fields: () => ({
    id: globalIdField('TaskType', ({ _id }) => _id),
    taskType: {
      type: new GraphQLNonNull(TaskTypeEnum),
    },
    fields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FieldsUnion))),
    },
  }),
  interfaces: [nodeInterface],
});
