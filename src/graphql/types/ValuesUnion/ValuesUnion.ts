import { GraphQLUnionType } from 'graphql';
import { BoolValueType } from './BoolValueType';
import { ChoiceValueType } from './ChoiceValueType';
import { MultipleChoiceWithParentValueType } from './MultipleChoiceWithParentValueType';
import { NumberValueType } from './NumberValueType';
import { TextValueType } from './TextValueType';

const TYPES = {
  BOOL: BoolValueType,
  CHOICE: ChoiceValueType,
  MULTIPLE_CHOICE_WITH_PARENT: MultipleChoiceWithParentValueType,
  NUMBER: NumberValueType,
  TEXT: TextValueType,
};

export const ValuesUnion = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: Object.values(TYPES),
  resolveType: ({ format }) => TYPES[format] || TYPES.TEXT,
});
