import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

export const SettingsNotificationsGeneralInputType = new GraphQLInputObjectType({
  name: 'SettingsNotificationsGeneralInputType',
  description: 'notifications general settings input type',
  fields: () => ({
    show: {
      type: GraphQLBoolean,
    },
    vibrate: {
      type: GraphQLBoolean,
    },
  }),
});
