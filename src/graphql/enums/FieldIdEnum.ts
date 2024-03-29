import { GraphQLEnumType } from 'graphql';
import { FieldId } from '../../constants';

export const FieldIdEnum = new GraphQLEnumType({
  name: 'FieldId',
  values: Object.keys(FieldId).reduce(
    (acc, value) => ({ ...acc, [value]: { value } }),
    {},
  ),
});
