import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FieldType } from '../../../../../../../constants';
import { FieldMeta } from '../../../../../../../db/interfaces';

// TODO jak rozwiązać problem cyklicznego odwołania modułu NestedValueType
const getTypes = (): Record<FieldType, GraphQLObjectType> => {
  const { ChoiceMetaType } = require('./ChoiceMetaType');
  const { SliderMetaType } = require('./SliderMetaType');
  const { SwitchMetaType } = require('./SwitchMetaType');
  const { TextMetaType } = require('./TextMetaType');
  const { NestedMetaType } = require('./NestedMetaType');

  return {
    SLIDER: SliderMetaType,
    SWITCH: SwitchMetaType,
    CHOICE: ChoiceMetaType,
    TEXT: TextMetaType,
    NESTED: NestedMetaType,
  };
};

export const MetasUnion = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: () => Object.values(getTypes()),
  resolveType(meta: FieldMeta) {
    return getTypes()[meta.fieldType];
  },
});
