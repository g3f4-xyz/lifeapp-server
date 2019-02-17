import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../db/api';
import { TripleChoiceValueType } from '../types/ValuesUnion/TripleChoiceValueType';
import { TripleChoiceValueInputType } from './inputs/ValuesInputsUnion/TripleChoiceValueInputType';

export const updateTaskTripleChoiceFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskTripleChoiceFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldValue: {
      type: new GraphQLNonNull(TripleChoiceValueInputType),
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
      type: new GraphQLNonNull(TripleChoiceValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: fieldIdId } = await fromGlobalId(fieldId);
    const { id: taskIdRaw } = await fromGlobalId(taskId);

    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldIdId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
