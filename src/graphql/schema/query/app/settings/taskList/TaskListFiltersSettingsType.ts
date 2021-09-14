import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} from 'graphql';
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
    status: {
      type: GraphQLString,
    },
  }),
});
