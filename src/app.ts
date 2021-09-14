import * as cors from 'cors';
import * as express from 'express';
import { createServer } from 'http';
import * as morgan from 'morgan';
import { router } from './router';

export default () => {
  const app = express();

  const server = createServer(app);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(express.json());

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );

  app.use(router);

  app.get('/', (_req, res) => {
    res.send('this is api server only, no static content');
  });

  return server;
};
