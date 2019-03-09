import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../db/api';
import { NestedValueType } from '../types/ValuesUnion/NestedValueType';
import { NestedValueInputType } from './inputs/ValuesInputsUnion/NestedValueInputType';

export const updateTaskNestedFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskNestedFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldValue: {
      type: new GraphQLNonNull(NestedValueInputType),
    },
  },
  outputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedFieldValue: {
      type: new GraphQLNonNull(NestedValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: taskIdRaw } = fromGlobalId(taskId);
    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
