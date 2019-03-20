import { GraphQLSchema } from 'graphql';

import { MutationType } from './mutation/MutationType';
import { QueryType } from './query/QueryType';

export const Schema = new GraphQLSchema({
  mutation: MutationType,
  query: QueryType,
});
