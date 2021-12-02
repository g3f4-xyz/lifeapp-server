import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { Context } from '../../../../db/interfaces';
import { FieldIdEnum } from '../../../enums/FieldIdEnum';
import { ValuesUnion } from '../../query/app/task/fields/value/ValuesUnion';
import { ValueInputType } from './inputs/value/ValueInputType';

const UpdateTaskFieldInput = new GraphQLInputObjectType({
  name: 'UpdateTaskFieldInput',
  fields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
    },
    value: {
      type: new GraphQLNonNull(ValueInputType),
    },
  },
});

export const updateTaskFieldMutation = mutationWithClientMutationId({
  name: 'UpdateTaskField',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
    },
    value: {
      type: new GraphQLNonNull(ValueInputType),
    },
  },
  outputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
    },
    updatedValue: {
      type: new GraphQLNonNull(ValuesUnion),
    },
    validationErrors: {
      type: new GraphQLList(new GraphQLNonNull(ValuesUnion)),
    },
  },
  mutateAndGetPayload: async (
    { fieldId, value, taskId },
    { taskService }: Context,
  ) => {
    const { id: taskIdRaw } = fromGlobalId(taskId);
    const { value: updatedValue } = await taskService.updateTaskField(
      taskIdRaw,
      fieldId,
      value,
    );

    return { fieldId, updatedValue, taskId };
  },
});
