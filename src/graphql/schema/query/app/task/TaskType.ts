import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { Task } from '../../../../../db/interfaces';
import { FieldType } from './fields/FieldType';

export const TaskType = new GraphQLObjectType<Task>({
  name: 'Task',
  fields: () => ({
    id: globalIdField('Task', (task: Task) => task.id),
    typeId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FieldType))),
      resolve(task) {
        const { fields } = task;

        return fields.map((field) => ({
          ...field,
          id: `${task.id}${field.fieldId}`,
        }));
      },
    },
  }),
});
