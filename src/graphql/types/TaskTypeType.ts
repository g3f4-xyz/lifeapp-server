import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';
import { FieldType } from './FieldType';

export const TaskTypeType = new GraphQLObjectType({
  name: 'TaskTypeType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('TaskTypeType', ({ _id }) => _id),
    typeId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    parentID: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
    },
    fields: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FieldType))),
    },
  }),
  interfaces: [nodeInterface],
});
