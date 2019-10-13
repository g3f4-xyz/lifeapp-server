import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { TASK_TYPE } from '../../../../../../constants';

export const NotificationsTypesSettingType = new GraphQLObjectType({
  name: 'NotificationsTypesSettingType',
  description: 'notifications schema setting type',
  fields: () => ({
    ...Object.keys(TASK_TYPE).reduce(
      (acc, key) => ({
        ...acc,
        [`${key.toLowerCase()}s`]: {
          type: new GraphQLNonNull(GraphQLBoolean),
        },
      }),
      {},
    ),
  }),
});
