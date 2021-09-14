import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { TaskListFiltersSettingsType } from './TaskListFiltersSettingsType';

export const TaskListSettingsType = new GraphQLObjectType({
  name: 'TaskListSettings',
  fields: () => ({
    filters: {
      type: new GraphQLNonNull(TaskListFiltersSettingsType),
    },
  }),
});
