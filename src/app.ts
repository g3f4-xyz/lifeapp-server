import * as cors from 'cors';
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

  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        sameSite: false,
        secure: process.env.NODE_ENV !== 'development',
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
