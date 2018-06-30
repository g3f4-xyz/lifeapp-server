const { GraphQLUnionType } = require('graphql');
const BoolMetaType = require('./BoolMetaType');
const ChoiceMetaType = require('./ChoiceMetaType');
const MultipleChoiceWithParentMetaType = require('./MultipleChoiceWithParentMetaType');
const NumberMetaType = require('./NumberMetaType');
const TextMetaType = require('./TextMetaType');

const TYPES = {
  BOOL: BoolMetaType,
  CHOICE: ChoiceMetaType,
  MULTIPLE_CHOICE_WITH_PARENT: MultipleChoiceWithParentMetaType,
  NUMBER: NumberMetaType,
  TEXT: TextMetaType,
};

module.exports = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType: ({ format }) => TYPES[format] || TYPES.TEXT,
});
