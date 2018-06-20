const { GraphQLUnionType } = require('graphql');
const BoolMetaType = require('./BoolMetaType');
const ChoiceMetaType = require('./ChoiceMetaType');
const NumberMetaType = require('./NumberMetaType');
const TextMetaType = require('./TextMetaType');

const TYPES = {
  BOOL: BoolMetaType,
  CHOICE: ChoiceMetaType,
  NUMBER: NumberMetaType,
  TEXT: TextMetaType,
};

module.exports = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType: ({ format }) => TYPES[format] || TYPES.TEXT,
});
