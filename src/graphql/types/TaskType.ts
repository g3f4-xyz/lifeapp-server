import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { ITask, ITaskField } from '../../db/interfaces';
import { nodeInterface } from '../nodeDefinitions';
import { FieldType } from './FieldType';

export const TaskType = new GraphQLObjectType<ITask>({
  name: 'TaskType',
  description: 'task type',
  fields: () => ({
    id: globalIdField('TaskType', ({ _id }) => _id),
    taskType: {
      type: GraphQLString,
    },
    title: {
      type: GraphQLString,
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
      type: GraphQLBoolean,
      resolve: ({ fields }): boolean => {
        const field = fields.find(({ fieldId }) => fieldId === 'PRIORITY');

        if (field) {
          return field.value.bool;
        }

        return null;
      },
    },
    status: {
      type: GraphQLString,
      resolve: ({ fields }): string => {
        const field = fields.find(({ fieldId }) => fieldId === 'STATUS');

        if (field) {
          return field.value.id;
        }

        return null;
      },
    },
    fields: {
      type: new GraphQLList(FieldType),
      args: {
        filterByIds: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve: ({ fields }, args): ITaskField[] => args && args.filterByIds
        ? fields.filter(({ fieldId }) => args.filterByIds.includes(fieldId))
        : fields,
    },
  }),
  interfaces: [nodeInterface],
});
