import { GraphQLEnumType } from 'graphql';
import { FIELD_ID } from '../../constants';

export const FieldIdEnum = new GraphQLEnumType({
  name: 'FieldIdEnum',
  values: Object.keys(FIELD_ID).reduce((acc, value) => ({ ...acc, [value]: { value }}), {}),
});
