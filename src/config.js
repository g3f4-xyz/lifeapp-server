const DB_HOST = process.env.DB === 'remote'
  ? 'mongodb://mo1563_lifeapp:Gitara15@85.194.240.29:27017/mo1563_lifeapp'
  : 'mongodb://localhost/lifeapp';
const DEMO_USER = {
  id: '1234567890',
  displayName: 'Demo User',
};
const HOST = process.env.HOST || 'http://localhost:30000';
const PORT = process.env.PORT || 30000;
const PUBLIC_PATH = `${process.cwd()}/build`;
const ROUTES = {
  AUTH: '/auth',
  DEMO: '/demo',
  LOGOUT: '/logout',
  GRAPHQL: '/graphql',
  NOTIFICATIONS: '/notifications',
  ROOT: '/',
};
const HTML_PATHS = {
  APP: `${PUBLIC_PATH}/app.html`,
  LOGIN: `${PUBLIC_PATH}/login.html`,
};
const SUB_ROUTES = {
  GOOGLE_AUTH: '/google',
  GOOGLE_LOGGED: '/google/logged',
};
const SESSION = {
  secret: '#PNW&(RX#MIP&#7i',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
};

module.exports = {
  DB_HOST,
  DEMO_USER,
  HTML_PATHS,
  HOST,
  PORT,
  PUBLIC_PATH,
  ROUTES,
  SUB_ROUTES,
  SESSION,
};
