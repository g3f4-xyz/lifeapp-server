import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const NotificationsGeneralSettingType = new GraphQLObjectType({
  name: 'GeneralNotificationsSettings',
  fields: () => ({
    show: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    vibrate: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
