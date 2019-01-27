import { GraphQLBoolean, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';

export const NotificationsTypesSettingType = new GraphQLObjectType({
  name: 'NotificationsTypesSettingType',
  description: 'notifications types setting type',
  fields: () => ({
    id: globalIdField('NotificationsTypesSettingType', ({ _id }) => _id),
    events: {
      type: GraphQLBoolean,
    },
    meetings: {
      type: GraphQLBoolean,
    },
    todos: {
      type: GraphQLBoolean,
    },
    routines: {
      type: GraphQLBoolean,
    },
  }),
  interfaces: [nodeInterface],
});
