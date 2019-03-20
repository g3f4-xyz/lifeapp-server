import { GraphQLNonNull, GraphQLString } from 'graphql';
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { updateTaskField } from '../../../../db/api';
import { FieldIdEnum } from '../../../enums/FieldIdEnum';
import { SwitchValueType } from '../../../unions/ValuesUnion/SwitchValueType';
import { SwitchValueInputType } from './inputs/value/SwitchValueInputType';

export const updateTaskSwitchFieldMutation = mutationWithClientMutationId({
  name: 'updateTaskSwitchFieldMutation',
  inputFields: {
    taskId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fieldId: {
      type: new GraphQLNonNull(FieldIdEnum),
    },
    fieldValue: {
      type: new GraphQLNonNull(SwitchValueInputType),
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
      type: new GraphQLNonNull(SwitchValueType),
    },
  },
  mutateAndGetPayload: async ({ fieldId, fieldValue, taskId }) => {
    const { id: taskIdRaw } = fromGlobalId(taskId);
    const updatedFieldValue = await updateTaskField(taskIdRaw, fieldId, fieldValue);

    return { fieldId, updatedFieldValue, taskId };
  },
});
