import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE_VALUE_MAP } from '../../../constants';
import { IFieldMeta } from '../../../db/interfaces';
import { ChoiceMetaType } from './ChoiceMetaType';
import { NestedMetaType } from './NestedMetaType';
import { SwitchMetaType } from './SwitchMetaType';
import { TextMetaType } from './TextMetaType';

const TYPES: FIELD_TYPE_VALUE_MAP<GraphQLObjectType> = {
  CHOICE: ChoiceMetaType,
  TEXT: TextMetaType,
  SWITCH: SwitchMetaType,
  NESTED: NestedMetaType,
};

export const MetasUnion = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType(meta: IFieldMeta) {
    return TYPES[meta.fieldType];
  },
});
