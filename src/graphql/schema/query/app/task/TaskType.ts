import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { ITask } from '../../../../../db/interfaces';
import { TaskStatusEnum } from '../../../../enums/TaskStatusEnum';
import { TaskTypeEnum } from '../../../../enums/TaskTypeEnum';
import { nodeInterface } from '../../../../nodeDefinitions';
import { FieldsUnion } from './fields/FieldsUnion';

export const TaskType = new GraphQLObjectType<ITask>({
  name: 'TaskType',
  description: 'task type',
  fields: () => ({
    id: globalIdField('TaskType', ({ _id }) => _id),
    taskType: {
      type: new GraphQLNonNull(TaskTypeEnum),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ fields }): string => {
        const field = fields.find(({ fieldId }) => fieldId === 'TITLE');

        if (field) {
          return field.value.text;
        }

        return '';
      },
    },
    note: {
      type: GraphQLString,
      resolve: ({ fields }): string => {
        const field = fields.find(({ fieldId }) => fieldId === 'NOTE');

        if (field) {
          return field.value.text;
        }

        return '';
      },
    },
    priority: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: ({ fields }): boolean => {
        const field = fields.find(({ fieldId }) => fieldId === 'PRIORITY');

        if (field) {
          return field.value.enabled;
        }

        return null;
      },
    },
    status: {
      type: new GraphQLNonNull(TaskStatusEnum),
      resolve: ({ fields }): string => {
        const field = fields.find(({ fieldId }) => fieldId === 'STATUS');

        return field.value.id;
      },
    },
    fields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FieldsUnion))),
    },
  }),
  interfaces: [nodeInterface],
});
