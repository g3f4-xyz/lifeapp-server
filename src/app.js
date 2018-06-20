const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');

const router = require('./router');
const { HOST, PORT, PUBLIC_PATH, SESSION } = require('./config');

// create server
const app = express();

// dev tools
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set static folder
app.use(express.static(PUBLIC_PATH));

// set body parser
app.use(bodyParser.json());

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
app.listen(app.get('port'), () => console.log(`Server is now running on ${HOST}`));
