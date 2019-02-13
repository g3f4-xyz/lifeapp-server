import { GraphQLObjectType } from 'graphql';
import { cleanApplicationMutation } from './mutations/cleanApplicationMutation';
import { deleteSubscriptionMutation } from './mutations/deleteSubscriptionMutation';
import { deleteTaskMutation } from './mutations/deleteTaskMutation';
import { saveNotificationsGeneralSettingMutation } from './mutations/saveNotificationsGeneralSettingMutation';
import { saveNotificationsTypesSettingMutation } from './mutations/saveNotificationsTypesSettingMutation';
import { saveTaskMutation } from './mutations/saveTaskMutation';
import { updateTaskBoolFieldMutation } from './mutations/updateTaskBoolFieldMutation';
import { updateTaskChoiceFieldMutation } from './mutations/updateTaskChoiceFieldMutation';
import { updateTaskTextFieldMutation } from './mutations/updateTaskTextFieldMutation';

import { testSubscriptionMutation } from './mutations/testSubscriptionMutation';

export const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  fields: () => ({
    cleanApplication: cleanApplicationMutation,
    deleteSubscription: deleteSubscriptionMutation,
    deleteTask: deleteTaskMutation,
    saveNotificationsGeneralSetting: saveNotificationsGeneralSettingMutation,
    saveNotificationsTypesSetting: saveNotificationsTypesSettingMutation,
    saveTask: saveTaskMutation,
    testSubscription: testSubscriptionMutation,
    updateTaskBoolField: updateTaskBoolFieldMutation,
    updateTaskChoiceField: updateTaskChoiceFieldMutation,
    updateTaskTextField: updateTaskTextFieldMutation,
  }),
});
