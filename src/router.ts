import * as cors from 'cors';
import { Router } from 'express';
import * as express from 'express';

import { HTML_PATHS, PUBLIC_PATH, ROUTES } from './config';
import { authRouter } from './middlewares/authRouter';
import { graphqlMiddleware } from './middlewares/graphqlMiddleware';
import { notificationMiddleware } from './middlewares/notificationMiddleware';

export const router = Router();

const LOGGED_COOKIE_KEY = 'logged';

router.use(ROUTES.AUTH, authRouter);
router.get(ROUTES.ROOT, (req, res) => {
  res.cookie(LOGGED_COOKIE_KEY, req.isAuthenticated());
  res.sendFile(HTML_PATHS.APP);
});
router.get(ROUTES.DEMO, (_, res) => {
  res.cookie(LOGGED_COOKIE_KEY, true);
  res.sendFile(HTML_PATHS.APP);
});
router.get(ROUTES.LOGOUT, (req, res) => {
  req.logout();
  res.cookie(LOGGED_COOKIE_KEY, false);
  res.redirect(ROUTES.ROOT);
});

// set static folder
router.use(express.static(PUBLIC_PATH));

router.use(ROUTES.GRAPHQL, cors(), graphqlMiddleware);
router.use(ROUTES.NOTIFICATIONS, cors(), notificationMiddleware);
