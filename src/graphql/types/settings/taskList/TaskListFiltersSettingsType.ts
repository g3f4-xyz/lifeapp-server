import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

export const TaskListFiltersSettingsType = new GraphQLObjectType({
  name: 'TaskListFiltersSettingsType',
  description: 'notifications type',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
