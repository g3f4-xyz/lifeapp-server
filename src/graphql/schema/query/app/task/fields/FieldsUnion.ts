import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE_VALUE_MAP } from '../../../../../../constants';
import { IField } from '../../../../../../db/interfaces';

// TODO jak rozwiązać problem cyklicznego odwołania modułu NestedValueType
const getTypes = (): FIELD_TYPE_VALUE_MAP<GraphQLObjectType> => {
  const { ChoiceFieldType } = require('./ChoiceFieldType');
  const { SliderFieldType } = require('./SliderFieldType');
  const { SwitchFieldType } = require('./SwitchFieldType');
  const { TextFieldType } = require('./TextFieldType');
  const { NestedFieldType } = require('./NestedFieldType');

  return {
    SLIDER: SliderFieldType,
    SWITCH: SwitchFieldType,
    CHOICE: ChoiceFieldType,
    TEXT: TextFieldType,
    NESTED: NestedFieldType,
  };
};

export const FieldsUnion = new GraphQLUnionType({
  name: 'FieldsUnion',
  description: 'Fields Union',
  types: () => Object.values(getTypes()),
  resolveType(field: IField) {
    const types = getTypes();
    const type = types[field.fieldType];

    if (type) {
      return type;
    }

    throw new Error(`cannot resolve type for FieldsUnion | ${JSON.stringify(field)}`);
  },
});
