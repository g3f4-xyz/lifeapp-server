import { GraphQLEnumType } from 'graphql';
import { FIELD_TYPE } from '../../constants';

export const FieldTypeEnum = new GraphQLEnumType({
  name: 'FieldTypeEnum',
  values: Object.keys(FIELD_TYPE).reduce((acc, value) => ({ ...acc, [value]: { value }}), {}),
});
