import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { TaskStatusEnum } from '../../../../../enums/TaskStatusEnum';
import { TaskTypeEnum } from '../../../../../enums/TaskTypeEnum';

export const TaskListFiltersSettingsType = new GraphQLObjectType({
  name: 'TaskListFiltersSettings',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    taskType: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(TaskTypeEnum)),
      ),
    },
    taskStatus: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(TaskStatusEnum)),
      ),
    },
  }),
});
