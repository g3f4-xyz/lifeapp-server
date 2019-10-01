import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import { TASK_TYPE } from '../../../../../../constants';

export const SettingsNotificationsTypesInputType = new GraphQLInputObjectType({
  name: 'SettingsNotificationsTypesInputType',
  description: 'settings notifications schema input type',
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
