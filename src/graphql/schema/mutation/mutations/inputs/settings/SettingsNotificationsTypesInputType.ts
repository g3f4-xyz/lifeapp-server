import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';
import { TaskTypeId } from '../../../../../../constants';

export const SettingsNotificationsTypesInputType = new GraphQLInputObjectType({
  name: 'SettingsNotificationsTypesInput',
  fields: () => ({
    ...Object.keys(TaskTypeId).reduce(
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
