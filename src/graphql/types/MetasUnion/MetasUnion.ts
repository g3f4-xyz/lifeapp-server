import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE_VALUE_MAP } from '../../../constants';
import { ChoiceMetaType } from './ChoiceMetaType';
import { SwitchMetaType } from './SwitchMetaType';
import { TextMetaType } from './TextMetaType';

const TYPES: FIELD_TYPE_VALUE_MAP<GraphQLObjectType> = {
  CHOICE: ChoiceMetaType,
  TEXT: TextMetaType,
  SWITCH: SwitchMetaType,
};

export const MetasUnion = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType: ({ type }) => TYPES[type] || TYPES.TEXT,
});
