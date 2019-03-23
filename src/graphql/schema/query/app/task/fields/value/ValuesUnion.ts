import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE_VALUE_MAP, FIELD_VALUE_KEYS_MAP } from '../../../../../../../constants';
import { IFieldValue } from '../../../../../../../db/interfaces';

// TODO jak rozwiązać problem cyklicznego odwołania modułu NestedValueType
const getTypes = (): FIELD_TYPE_VALUE_MAP<GraphQLObjectType> => {
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
  resolveType(value: IFieldValue) {
    const types = getTypes();
    const valueKey = Object.keys(value);
    const typeKey = Object
      .keys(types)
      .find(fieldType => valueKey.includes(FIELD_VALUE_KEYS_MAP[fieldType]));
    const type = types[typeKey];

    if (type) {
      return type;
    }

    throw new Error(`cannot resolve type for ValueUnion | ${JSON.stringify(value)}`);
  },
});
