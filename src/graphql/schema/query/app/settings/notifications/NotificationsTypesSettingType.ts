import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../../../../nodeDefinitions';

export const NotificationsTypesSettingType = new GraphQLObjectType({
  name: 'NotificationsTypesSettingType',
  description: 'notifications schema setting type',
  fields: () => ({
    id: globalIdField('NotificationsTypesSettingType', ({ _id }) => _id),
    events: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    meetings: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    todos: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    routines: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
  interfaces: [nodeInterface],
});
