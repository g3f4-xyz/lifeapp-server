import {
  GraphQLBoolean,
  GraphQLInputObjectType,
  GraphQLNonNull,
} from 'graphql';

export const SettingsNotificationsGeneralInputType = new GraphQLInputObjectType(
  {
    name: 'SettingsNotificationsGeneralInput',
    fields: () => ({
      show: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      vibrate: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    }),
  },
);
