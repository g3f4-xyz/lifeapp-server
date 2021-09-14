import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { TaskTypeType } from './TaskTypeType';

export const TaskTypeListType = new GraphQLObjectType({
  name: 'TaskTypes',
  fields: () => ({
    list: {
      type: new GraphQLNonNull(new GraphQLList(TaskTypeType)),
    },
  }),
});
