import { Middleware } from 'express-graphql';
import * as graphqlHTTP from 'express-graphql';
import { IncomingMessage } from 'http';
import { DEMO_USER } from '../config';
import { IUser } from '../db/interfaces';
import { Schema } from '../graphql/schema/Schema';

export const graphqlMiddleware: Middleware = graphqlHTTP((req: IncomingMessage & { user: IUser }) => ({
  schema: Schema,
  pretty: true,
  graphiql: true,
  context: {
    user: req.user || DEMO_USER,
  },
}));
