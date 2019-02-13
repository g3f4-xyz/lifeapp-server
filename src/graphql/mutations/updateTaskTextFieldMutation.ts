import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../db/api';
import { TextValueType } from '../types/ValuesUnion/TextValueType';
import { TextValueInputType } from './inputs/ValuesInputsUnion/TextValueInputType';

export const updateTaskTextFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskTextFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldValue: {
      type: new GraphQLNonNull(TextValueInputType),
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
      type: new GraphQLNonNull(TextValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: fieldIdId } = await fromGlobalId(fieldId);
    const { id: taskIdRaw } = await fromGlobalId(taskId);

    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldIdId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
