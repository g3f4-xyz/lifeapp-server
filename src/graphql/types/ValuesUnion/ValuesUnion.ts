import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE_VALUE_MAP } from '../../../constants';
import { IField } from '../../../db/interfaces';
import { NestedChoiceValueType } from './NestedChoiceValueType';
import { SwitchValueType } from './SwitchValueType';
import { ChoiceValueType } from './ChoiceValueType';
import { TextValueType } from './TextValueType';

const TYPES: FIELD_TYPE_VALUE_MAP<GraphQLObjectType> = {
  SWITCH: SwitchValueType,
  CHOICE: ChoiceValueType,
  TEXT: TextValueType,
  NESTED_CHOICE: NestedChoiceValueType,
};

export const ValuesUnion = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: Object.values(TYPES),
  resolveType: ({ fieldType }: IField) => TYPES[fieldType],
});
