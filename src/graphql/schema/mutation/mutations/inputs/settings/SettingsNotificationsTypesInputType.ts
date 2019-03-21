import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const SettingsNotificationsTypesInputType = new GraphQLInputObjectType({
  name: 'SettingsNotificationsTypesInputType',
  description: 'settings notifications schema input type',
  fields: () => ({
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
});
