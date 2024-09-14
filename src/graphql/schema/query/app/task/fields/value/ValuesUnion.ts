import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { fieldValueKeyMap, FieldType } from '../../../../../../../constants';
import { FieldValue } from '../../../../../../../db/interfaces';

// TODO jak rozwiązać problem cyklicznego odwołania modułu NestedValueType
const getTypes = (): Record<FieldType, GraphQLObjectType> => {
  const { ChoiceValueType } = require('./ChoiceValueType');
  const { SliderValueType } = require('./SliderValueType');
  const { SwitchValueType } = require('./SwitchValueType');
  const { TextValueType } = require('./TextValueType');
  const { NestedValueType } = require('./NestedValueType');

  return {
    SLIDER: SliderValueType,
    SWITCH: SwitchValueType,
    CHOICE: ChoiceValueType,
    TEXT: TextValueType,
    NESTED: NestedValueType,
  };
};

export const ValuesUnion = new GraphQLUnionType({
  name: 'ValuesUnion',
  description: 'Values Union',
  types: () => Object.values(getTypes()),
  resolveType(value: FieldValue) {
    const types = getTypes();
    const typeKey = Object.keys(types).find(
      fieldType =>
        Object.keys(value).includes(fieldValueKeyMap[fieldType as FieldType]),
      // TODO after adding proper type discrimination this casting should be removed
    ) as FieldType;
    const type = types[typeKey];

    if (type) {
      return type;
    }

    throw new Error(
      `cannot resolve type for ValueUnion | ${JSON.stringify(value)}`,
    );
  },
});
