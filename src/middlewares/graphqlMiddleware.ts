import { Request } from 'express';
import { Middleware, OptionsResult } from 'express-graphql';
import * as graphqlHTTP from 'express-graphql';
import { DEMO_USER } from '../config';
import { rootSchema } from '../graphql/schema';

export const graphqlMiddleware: Middleware = graphqlHTTP((req: Request): OptionsResult => ({
  schema: rootSchema,
  pretty: true,
  graphiql: true,
  context: {
    user: req.user || DEMO_USER,
  },
}));
