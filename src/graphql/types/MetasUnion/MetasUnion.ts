import { GraphQLObjectType, GraphQLUnionType } from 'graphql';
import { FIELD_TYPE, FIELD_TYPE_VALUE_MAP } from '../../../constants';
import { IField } from '../../../db/interfaces';
import { ChoiceMetaType } from './ChoiceMetaType';
import { SwitchMetaType } from './SwitchMetaType';
import { TextMetaType } from './TextMetaType';
import { TripleChoiceMetaType } from './TripleChoiceMetaType';

const TYPES: FIELD_TYPE_VALUE_MAP<GraphQLObjectType> = {
  [FIELD_TYPE.CHOICE]: ChoiceMetaType,
  [FIELD_TYPE.TEXT]: TextMetaType,
  [FIELD_TYPE.SWITCH]: SwitchMetaType,
  [FIELD_TYPE.TRIPLE_CHOICE]: TripleChoiceMetaType,
};

export const MetasUnion = new GraphQLUnionType({
  name: 'MetasUnion',
  description: 'metas union',
  types: Object.values(TYPES),
  resolveType(field: IField) {
    return TYPES[field.fieldType];
  },
});
