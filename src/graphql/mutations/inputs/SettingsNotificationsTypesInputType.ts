import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

export const SettingsNotificationsTypesInputType = new GraphQLInputObjectType({
  name: 'SettingsNotificationsTypesInputType',
  description: 'settings notifications types input type',
  fields: () => ({
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
});
