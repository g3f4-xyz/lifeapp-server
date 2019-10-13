import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const NotificationsGeneralSettingType = new GraphQLObjectType({
  name: 'NotificationsGeneralSettingType',
  description: 'notifications general setting type',
  fields: () => ({
    show: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    vibrate: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }),
});
