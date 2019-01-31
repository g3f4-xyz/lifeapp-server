import { GraphQLInputObjectType, GraphQLList, GraphQLString } from 'graphql';
import { ChoiceOptionsMetaInputType } from './ChoiceOptionsMetaInputType';

export const MetaOptionsSetInputType = new GraphQLInputObjectType({
  name: 'MetaOptionsSetInputType',
  fields: () => ({
    customValueOptionMask: {
      type: GraphQLString,
    },
    parentValue: {
      type: GraphQLString,
    },
    options: {
      type: new GraphQLList(ChoiceOptionsMetaInputType),
    },
  }),
});
