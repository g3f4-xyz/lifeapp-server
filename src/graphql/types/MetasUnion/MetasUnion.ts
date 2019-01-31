import { GraphQLUnionType } from 'graphql';
import { BoolMetaType } from './BoolMetaType';
import { ChoiceMetaType } from './ChoiceMetaType';
import { MultipleChoiceWithParentType } from './MultipleChoiceWithParentMetaType';
import { NumberMetaType } from './NumberMetaType';
import { TextMetaType } from './TextMetaType';

const TYPES = {
  BOOL: BoolMetaType,
  CHOICE: ChoiceMetaType,
  MULTIPLE_CHOICE_WITH_PARENT: MultipleChoiceWithParentType,
  NUMBER: NumberMetaType,
  TEXT: TextMetaType,
};

export const MetasUnion = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType: ({ format }) => TYPES[format] || TYPES.TEXT,
});
