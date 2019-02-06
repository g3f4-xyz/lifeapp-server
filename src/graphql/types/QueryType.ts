import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { IContext } from '../../db/interfaces';
import { nodeField } from '../nodeDefinitions';
import { AppType } from './AppType';

export const QueryType = new GraphQLObjectType<undefined, IContext>({
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
