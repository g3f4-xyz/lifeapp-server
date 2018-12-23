const { GraphQLInputObjectType } = require('graphql');

const NotificationsGeneralInputType = require('./NotificationsGeneralSettingInputType');
const TaskTypeNotificationsInputType = require('./NotificationsTypesInputType');

module.exports = new GraphQLInputObjectType({
  name: 'NotificationsInputType',
  description: 'notifications input type',
  fields: () => ({
    general: {
      type: NotificationsGeneralInputType,
    },
    types: {
      type: TaskTypeNotificationsInputType,
    },
  }),
});
