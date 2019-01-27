import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { OptionsMapType } from './OptionsMapType';

export const MultipleChoiceWithParentType = new GraphQLObjectType({
  name: 'MultipleChoiceWithParentType',
  description: 'choice meta type',
  fields: () => ({
    parentID: {
      type: GraphQLString,
    },
    defaultValue: {
      type: GraphQLString,
    },
    optionsSet: {
      description: 'optionsSet',
      type: new GraphQLList(OptionsMapType),
    },
  }),
});
