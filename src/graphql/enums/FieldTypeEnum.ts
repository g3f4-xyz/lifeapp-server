import { GraphQLEnumType } from 'graphql';
import { FieldType } from '../../constants';

export const FieldTypeEnum = new GraphQLEnumType({
  name: 'FieldType',
  values: Object.keys(FieldType).reduce(
    (acc, value) => ({ ...acc, [value]: { value } }),
    {},
  ),
});
