import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { TASK_TYPE } from '../../../../../../constants';
import { nodeInterface } from '../../../../../nodeDefinitions';

export const NotificationsTypesSettingType = new GraphQLObjectType({
  name: 'NotificationsTypesSettingType',
  description: 'notifications schema setting type',
  fields: () => ({
    id: globalIdField('NotificationsTypesSettingType', ({ _id }) => _id),
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
  interfaces: [nodeInterface],
});
