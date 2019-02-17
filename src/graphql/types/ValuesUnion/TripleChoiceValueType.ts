import { GraphQLObjectType, GraphQLString } from 'graphql';
import { IContext, IFieldValue } from '../../../db/interfaces';

export const TripleChoiceValueType: GraphQLObjectType<IFieldValue, IContext> = new GraphQLObjectType({
  name: 'TripleChoiceValueType',
  description: 'partial choice value type',
  fields: () => ({
    ownValue: {
      type: GraphQLString,
    },
    childrenValue: {
      type: TripleChoiceValueType,
    },
  }),
});
