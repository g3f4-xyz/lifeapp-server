import { Application } from 'express';

// create server
import { json } from 'body-parser';
import * as express from 'express';
import * as session from 'express-session';
import * as morgan from 'morgan';
import * as passport from 'passport';

import { PORT, PUBLIC_PATH, SESSION } from './config';
import { router } from './router';

const app: Application = express();

// dev tools
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set static folder
app.use(express.static(PUBLIC_PATH));

// set body parser
app.use(json());

// express Session
app.use(session(SESSION));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// register router
app.use(router);

// set Port
app.set('port', (process.env.PORT || PORT));

// start server
app.listen(app.get('port'));
