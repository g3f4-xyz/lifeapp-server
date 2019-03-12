import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { TaskTypeEnum } from '../../Enums/TaskTypeEnum';

export const TaskListFiltersSettingsType = new GraphQLObjectType({
  name: 'TaskListFiltersSettingsType',
  description: 'notifications type',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    taskType: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TaskTypeEnum))),
    },
    status: {
      type: GraphQLString,
    },
  }),
});
