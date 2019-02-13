import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../db/api';
import { BoolValueType } from '../types/ValuesUnion/BoolValueType';
import { BoolValueInputType } from './inputs/ValuesInputsUnion/BoolValueInputType';

export const updateTaskBoolFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskBoolFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldValue: {
      type: new GraphQLNonNull(BoolValueInputType),
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
      type: new GraphQLNonNull(BoolValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: fieldIdId } = await fromGlobalId(fieldId);
    const { id: taskIdRaw } = await fromGlobalId(taskId);

    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldIdId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
