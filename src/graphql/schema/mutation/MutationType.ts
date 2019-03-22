import { GraphQLObjectType } from 'graphql';
import { cleanApplicationMutation } from './mutations/cleanApplicationMutation';
import { deleteSubscriptionMutation } from './mutations/deleteSubscriptionMutation';
import { deleteTaskMutation } from './mutations/deleteTaskMutation';
import { saveNotificationsGeneralSettingMutation } from './mutations/saveNotificationsGeneralSettingMutation';
import { saveNotificationsTypesSettingMutation } from './mutations/saveNotificationsTypesSettingMutation';
import { updateTaskFieldMutation } from './mutations/updateTaskFieldMutation';
import { updateTaskListStatusFilterSettingMutation } from './mutations/updateTaskListStatusFilterSettingMutation';
import { updateTaskListTaskTypeFilterSettingMutation } from './mutations/updateTaskListTaskTypeFilterSettingMutation';
import { updateTaskListTitleFilterSettingMutation } from './mutations/updateTaskListTitleFilterSettingMutation';

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
    updateTaskField: updateTaskFieldMutation,
    updateTaskListStatusFilterSetting: updateTaskListStatusFilterSettingMutation,
    updateTaskListTitleFilterSetting: updateTaskListTitleFilterSettingMutation,
    updateTaskListTaskTypeFilterSetting: updateTaskListTaskTypeFilterSettingMutation,
  }),
});
