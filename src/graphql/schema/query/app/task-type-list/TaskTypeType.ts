import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { TaskTypeEnum } from '../../../../enums/TaskTypeEnum';

export const TaskTypeType = new GraphQLObjectType({
  name: 'TaskType',
  fields: () => ({
    typeId: {
      type: new GraphQLNonNull(TaskTypeEnum),
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    parentTypeIds: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
    },
    fieldsIds: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(GraphQLString)),
      ),
    },
  }),
});
