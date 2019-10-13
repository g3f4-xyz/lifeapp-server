import { json } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as passport from 'passport';
import { PORT, SESSION } from './config';
import { router } from './router';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set body parser
app.use(json());
app.use(cookieParser());

// express Session
app.use(session(SESSION));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// register router
app.use(router);

// set Port
app.set('port', PORT);

export default app;
