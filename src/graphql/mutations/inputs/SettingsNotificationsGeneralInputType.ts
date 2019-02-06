import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export const SettingsNotificationsGeneralInputType = new GraphQLInputObjectType({
  name: 'SettingsNotificationsGeneralInputType',
  description: 'notifications general settings input type',
  fields: () => ({
    show: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    vibrate: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
