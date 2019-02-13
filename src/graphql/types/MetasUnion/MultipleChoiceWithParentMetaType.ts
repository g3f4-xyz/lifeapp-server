import { GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { OptionsMapType } from './OptionsMapType';

export const MultipleChoiceWithParentType = new GraphQLObjectType({
  name: 'MultipleChoiceWithParentType',
  description: 'choice meta type',
  fields: () => ({
    required: {
      description: 'required',
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    parentID: {
      type: new GraphQLNonNull(GraphQLString),
    },
    defaultValue: {
      type: GraphQLString,
    },
    optionsSet: {
      description: 'optionsSet',
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OptionsMapType))),
    },
  }),
});
