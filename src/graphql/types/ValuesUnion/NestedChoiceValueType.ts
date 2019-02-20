import { GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext, IFieldValue } from '../../../db/interfaces';

export const NestedChoiceValueType: GraphQLObjectType<IFieldValue, IContext> = new GraphQLObjectType({
  name: 'NestedChoiceValueType',
  description: 'partial choice value type',
  fields: () => ({
    ownValue: {
      type: GraphQLString,
    },
    childrenValue: {
      type: NestedChoiceValueType,
    },
  }),
});
