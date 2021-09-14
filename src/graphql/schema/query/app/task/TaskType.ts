import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Task } from '../../../../../db/interfaces';
import { TaskTypeEnum } from '../../../../enums/TaskTypeEnum';
import { nodeInterface } from '../../../../nodeDefinitions';
import { FieldType } from './fields/FieldType';

export const TaskType = new GraphQLObjectType<Task>({
  name: 'Task',
  fields: () => ({
    id: globalIdField('Task'),
    typeId: {
      type: new GraphQLNonNull(TaskTypeEnum),
    },
    fields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FieldType))),
    },
  }),
  interfaces: [nodeInterface],
});
