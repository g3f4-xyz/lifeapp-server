import { config } from 'dotenv';
import * as express from 'express';
import * as session from 'express-session';
import { createServer } from 'http';
import * as morgan from 'morgan';
import { initialize as passportInitialize } from 'passport';
import * as socketio from 'socket.io';
import { router } from './router';
import UserService from './services/UserService';

config();

export default (userService: UserService) => {
  const app = express();

  const server = createServer(app);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use(express.json());
  app.use(passportInitialize());

  app.use(function(req, res, next) {
    // @ts-ignore
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin as string);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    );
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: false,
      },
    }),
  );

  const io = socketio(server);

  io.on('connect', socket => {
    socket.on('end', function() {
      socket.disconnect(false);
    });
  });

  app.set('io', io);

  app.get('/user-info', async (req, res) => {
    const { socketId } = req.query;

    if (req.session.passport) {
      const io = req.app.get('io');
      const user = await userService.getUser(req.session.passport.user);

      io.in(socketId).emit(user.info.provider, user.info);

      res.send(user.info);
    } else {
      res.send({
        error: 'no user info',
      });
    }
  });

  app.use(router);

  app.get('/', (_req, res) => {
    res.send('this is api server only, no static content');
  });

  return server;
};
