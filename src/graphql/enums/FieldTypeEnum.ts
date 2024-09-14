import { GraphQLEnumType } from 'graphql';
import { FieldTypes } from '../../constants';

export const FieldTypeEnum = new GraphQLEnumType({
  name: 'FieldType',
  values: FieldTypes.reduce(
    (acc, value) => ({ ...acc, [value]: { value } }),
    {},
  ),
});
