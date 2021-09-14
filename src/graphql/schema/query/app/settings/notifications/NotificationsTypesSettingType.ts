import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { TaskTypeId } from '../../../../../../constants';

export const NotificationsTypesSettingType = new GraphQLObjectType({
  name: 'TypesNotificationsSettings',
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
