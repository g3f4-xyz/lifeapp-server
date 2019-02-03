import { SessionOptions } from 'express-session';
import { IConfigMap } from './db/interfaces';

export const DB_HOST: string = process.env.DB === 'remote'
  ? 'mongodb://mo1563_lifeapp:Gitara15@85.194.240.29:27017/mo1563_lifeapp'
  : 'mongodb://localhost/lifeapp';
export const DEMO_USER: IConfigMap<string> = {
  id: '1234567890',
};
export const HOST: string = process.env.HOST || 'http://localhost:30000';
export const PORT: string = process.env.PORT || '30000';
export const PUBLIC_PATH: string = `${process.cwd()}/build`;
export const ROUTES: IConfigMap<string> = {
  AUTH: '/auth',
  DEMO: '/demo',
  LOGOUT: '/logout',
  GRAPHQL: '/graphql',
  NOTIFICATIONS: '/notifications',
  ROOT: '/',
};
export const HTML_PATHS: IConfigMap<string> = {
  APP: `${PUBLIC_PATH}/index.html`,
};
export const SUB_ROUTES: IConfigMap<string> = {
  GOOGLE_AUTH: '/google',
  GOOGLE_LOGGED: '/google/logged',
};
export const SESSION: SessionOptions = {
  secret: '#PNW&(RX#MIP&#7i',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
};