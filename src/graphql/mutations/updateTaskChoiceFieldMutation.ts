import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../db/api';
import { ChoiceValueType } from '../types/ValuesUnion/ChoiceValueType';
import { ChoiceValueInputType } from './inputs/ValuesInputsUnion/ChoiceValueInputType';

export const updateTaskChoiceFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskChoiceFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldValue: {
      type: new GraphQLNonNull(ChoiceValueInputType),
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
      type: new GraphQLNonNull(ChoiceValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: fieldIdId } = await fromGlobalId(fieldId);
    const { id: taskIdRaw } = await fromGlobalId(taskId);

    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldIdId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
