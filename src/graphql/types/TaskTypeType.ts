import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from '../nodeDefinitions';
import { FieldType } from './FieldType';

export const TaskTypeType = new GraphQLObjectType({
  name: 'TaskTypeType',
  description: 'task type type',
  fields: () => ({
    id: globalIdField('TaskTypeType', ({ _id }) => _id),
    typeId: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    order: {
      type: GraphQLInt,
    },
    isCustom: {
      type: GraphQLBoolean,
    },
    parentID: {
      type: GraphQLString,
    },
    fields: {
      type: new GraphQLList(FieldType),
    },
  }),
  interfaces: [nodeInterface],
});
