import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';

export const NotificationsGeneralSettingType = new GraphQLObjectType({
  name: 'NotificationsGeneralSettingType',
  description: 'notifications general setting type',
  fields: () => ({
    id: globalIdField('NotificationsGeneralSettingType', ({ _id }) => _id),
    show: {
      type: GraphQLBoolean,
    },
    vibrate: {
      type: GraphQLBoolean,
    },
  }),
  interfaces: [nodeInterface],
});
