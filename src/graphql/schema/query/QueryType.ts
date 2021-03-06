import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from '../../../db/interfaces';
import { nodeField } from '../../nodeDefinitions';
import { AppType } from './app/AppType';

export const QueryType = new GraphQLObjectType<undefined, Context>({
  name: 'QueryType',
  fields: () => ({
    app: {
      description: 'Application entry point',
      type: new GraphQLNonNull(AppType),
      resolve: (): boolean => true,
    },
    node: nodeField,
  }),
});
