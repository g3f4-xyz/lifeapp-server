import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE_VALUE_MAP, FIELD_VALUE_KEYS_MAP } from '../../../constants';
import { IFieldValue } from '../../../db/interfaces';
import { NestedValueType } from './NestedValueType';
import { SwitchValueType } from './SwitchValueType';
import { ChoiceValueType } from './ChoiceValueType';
import { TextValueType } from './TextValueType';

const TYPES: FIELD_TYPE_VALUE_MAP<GraphQLObjectType> = {
  SWITCH: SwitchValueType,
  CHOICE: ChoiceValueType,
  TEXT: TextValueType,
  NESTED: NestedValueType,
};

export const ValuesUnion = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: Object.values(TYPES),
  resolveType(value: IFieldValue) {
    const valueKeys = Object.keys(value);
    const typeKey = Object
      .keys(TYPES)
      .find(fieldType => FIELD_VALUE_KEYS_MAP[fieldType]
        .filter((val: string) => -1 !== valueKeys.indexOf(val)).length > 0);
    const type = TYPES[typeKey];

    if (type) {
      return type;
    }

    throw new Error(`cannot resolve type for ValueUnion | ${JSON.stringify(value)}`);
  },
});
