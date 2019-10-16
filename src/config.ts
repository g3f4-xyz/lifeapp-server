import { ConfigMap } from './db/interfaces';

export const DB_HOST: string =
  process.env.DB === 'remote'
    ? 'mongodb://mo1563_lifeapp:Gitara15@85.194.240.29:27017/mo1563_lifeapp'
    : 'mongodb://localhost/lifeapp';

export const DEMO_USER = {
  id: '1234567890',
};

export const HOST: string = process.env.HOST || 'http://localhost:30000';

export const ROUTES: ConfigMap<string> = {
  AUTH: '/auth',
  DEMO: '/demo',
  LOGOUT: '/logout',
  GRAPHQL: '/graphql',
  NOTIFICATIONS: '/notifications',
  ROOT: '/',
};

export const SUB_ROUTES: ConfigMap<string> = {
  GOOGLE_AUTH: '/google',
  GOOGLE_LOGGED: '/google/logged',
};
