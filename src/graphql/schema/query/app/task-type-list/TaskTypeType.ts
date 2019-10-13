import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../../../../nodeDefinitions';
import { TaskTypeEnum } from '../../../../enums/TaskTypeEnum';

export const TaskTypeType = new GraphQLObjectType({
  name: 'TaskTypeType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('TaskTypeType'),
    typeId: {
      type: new GraphQLNonNull(TaskTypeEnum),
    },
    label: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
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
  interfaces: [nodeInterface],
});
