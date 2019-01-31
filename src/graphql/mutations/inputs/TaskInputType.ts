import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql';
import { FieldsInputType } from './FieldsInputType';

export const TaskInputType = new GraphQLInputObjectType({
  name: 'TaskInputType',
  description: 'task input type',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    taskType: {
      type: GraphQLString,
    },
    fields: {
      type: new GraphQLList(FieldsInputType),
    },
  }),
});
