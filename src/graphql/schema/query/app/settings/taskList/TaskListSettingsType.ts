import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { TaskListFiltersSettingsType } from './TaskListFiltersSettingsType';

export const TaskListSettingsType = new GraphQLObjectType({
  name: 'TaskListSettingsType',
  description: 'notifications type',
  fields: () => ({
    filters: {
      type: new GraphQLNonNull(TaskListFiltersSettingsType),
    },
  }),
});
