import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FieldType } from '../../../../../../../constants';
import { FieldMeta } from '../../../../../../../db/interfaces';

// TODO jak rozwiązać problem cyklicznego odwołania modułu NestedValueType
const getTypes = (): Record<FieldType, GraphQLObjectType> => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { ChoiceMetaType } = require('./ChoiceMetaType');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SliderMetaType } = require('./SliderMetaType');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { SwitchMetaType } = require('./SwitchMetaType');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { TextMetaType } = require('./TextMetaType');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
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
