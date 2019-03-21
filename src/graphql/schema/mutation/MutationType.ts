import { GraphQLObjectType } from 'graphql';
import { cleanApplicationMutation } from './mutations/cleanApplicationMutation';
import { deleteSubscriptionMutation } from './mutations/deleteSubscriptionMutation';
import { deleteTaskMutation } from './mutations/deleteTaskMutation';
import { saveNotificationsGeneralSettingMutation } from './mutations/saveNotificationsGeneralSettingMutation';
import { saveNotificationsTypesSettingMutation } from './mutations/saveNotificationsTypesSettingMutation';
import { updateTaskListStatusFilterSettingMutation } from './mutations/updateTaskListStatusFilterSettingMutation';
import { updateTaskListTitleFilterSettingMutation } from './mutations/updateTaskListTitleFilterSettingMutation';
import { updateTaskListTaskTypeFilterSettingMutation } from './mutations/updateTaskListTaskTypeFilterSettingMutation';
import { updateTaskChoiceFieldMutation } from './mutations/updateTaskChoiceFieldMutation';
import { updateTaskNestedFieldMutation } from './mutations/updateTaskNestedFieldMutation';
import { updateTaskSwitchFieldMutation } from './mutations/updateTaskSwitchFieldMutation';
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
    testSubscription: testSubscriptionMutation,
    updateTaskSwitchField: updateTaskSwitchFieldMutation,
    updateTaskChoiceField: updateTaskChoiceFieldMutation,
    updateTaskTextField: updateTaskTextFieldMutation,
    updateTaskNestedField: updateTaskNestedFieldMutation,
    updateTaskListStatusFilterSetting: updateTaskListStatusFilterSettingMutation,
    updateTaskListTitleFilterSetting: updateTaskListTitleFilterSettingMutation,
    updateTaskListTaskTypeFilterSetting: updateTaskListTaskTypeFilterSettingMutation,
  }),
});
