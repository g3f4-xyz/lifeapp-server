import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../../../db/api';
import { FieldIdEnum } from '../../../enums/FieldIdEnum';
import { SliderValueType } from '../../../unions/ValuesUnion/SliderValueType';
import { SliderValueInputType } from './inputs/value/SliderValueInputType';

export const updateTaskSliderFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskSliderFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
    },
    fieldValue: {
      type: new GraphQLNonNull(SliderValueInputType),
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
      type: new GraphQLNonNull(SliderValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: taskIdRaw } = fromGlobalId(taskId);
    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
