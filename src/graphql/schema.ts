import { GraphQLSchema } from 'graphql';

import { MutationType } from './mutation';
import { QueryType } from './types/QueryType';

export const rootSchema = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});
