const { GraphQLUnionType } = require('graphql');
const BoolValueType = require('./BoolValueType');
const ChoiceValueType = require('./ChoiceValueType');
const NumberValueType = require('./NumberValueType');
const TextValueType = require('./TextValueType');

const TYPES = {
  BOOL: BoolValueType,
  CHOICE: ChoiceValueType,
  NUMBER: NumberValueType,
  TEXT: TextValueType,
};

module.exports = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: Object.values(TYPES),
  resolveType: ({ format }) => TYPES[format] || TYPES.TEXT,
});
