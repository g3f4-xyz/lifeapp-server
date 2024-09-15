import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TaskStatusEnum } from '../../../../../enums/TaskStatusEnum';

export const TaskListFiltersSettingsType = new GraphQLObjectType({
  name: 'TaskListFiltersSettings',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    taskType: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
    },
    taskStatus: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(TaskStatusEnum)),
      ),
    },
  }),
});
