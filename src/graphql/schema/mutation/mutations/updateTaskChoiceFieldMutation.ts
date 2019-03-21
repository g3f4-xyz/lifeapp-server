import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../../../db/api';
import { FieldIdEnum } from '../../../enums/FieldIdEnum';
import { ChoiceValueType } from '../../../unions/ValuesUnion/ChoiceValueType';
import { ChoiceValueInputType } from './inputs/value/ChoiceValueInputType';

export const updateTaskChoiceFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskChoiceFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
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
      type: new GraphQLNonNull(FieldIdEnum),
    },
    updatedFieldValue: {
      type: new GraphQLNonNull(ChoiceValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: taskIdRaw } = fromGlobalId(taskId);
    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
