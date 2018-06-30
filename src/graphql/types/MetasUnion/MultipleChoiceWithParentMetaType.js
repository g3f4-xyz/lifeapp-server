const { GraphQLList, GraphQLObjectType, GraphQLString } = require('graphql');
const ChoiceOptionsType = require('./ChoiceOptionsType');

module.exports = new GraphQLObjectType({
  name: 'MultipleChoiceWithParentType',
  description: 'choice meta type',
  fields: () => ({
    parentId: {
      type: GraphQLString,
    },
    defaultValue: {
      type: GraphQLString,
    },
    optionsSet: {
      description: 'optionsSet',
      type: new GraphQLList(new GraphQLObjectType({
        name: 'OptionsMapType',
        description: 'options map type',
        fields: () => ({
          customValueOptionMask: {
            type: GraphQLString,
          },
          parentValue: {
            description: 'parentValue',
            type: GraphQLString,
          },
          options: {
            description: 'options',
            type: ChoiceOptionsType,
          },
        }),
      })),
    },
  }),
});
