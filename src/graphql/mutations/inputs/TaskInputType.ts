import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql';
import { FieldsInputType } from './FieldsInputType';

export const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInputType',
  description: 'task input type',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    taskType: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FieldsInputType))),
    },
  }),
});
