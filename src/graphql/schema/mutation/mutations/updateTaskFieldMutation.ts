import { GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../../../db/api/taskApi';
import { FieldIdEnum } from '../../../enums/FieldIdEnum';
import { ValuesUnion } from '../../query/app/task/fields/value/ValuesUnion';
import { ValueInputType } from './inputs/value/ValueInputType';

export const updateTaskFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskFieldMutation',
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
  mutateAndGetPayload: async ({ fieldId, value, taskId }) => {
    const { id: taskIdRaw } = fromGlobalId(taskId);
    const { value: updatedValue, validationErrors } = await updateTaskField(
      taskIdRaw,
      fieldId,
      value,
    );

    return { fieldId, updatedValue, validationErrors, taskId };
  },
});
