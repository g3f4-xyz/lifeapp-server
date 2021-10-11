export const PORT = process.env.PORT || '9000';

export const DB_HOST =
  process.env.DB === 'remote'
    ? `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.twrjo.mongodb.net/lifeapp?retryWrites=true&w=majority`
    : 'mongodb://localhost/lifeapp';

export const ROUTES = {
  GRAPHQL: '/graphql',
  NOTIFICATIONS: '/notifications',
  ROOT: '/',
};
