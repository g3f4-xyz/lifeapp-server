import * as cors from 'cors';
import { Router } from 'express';

import { HTML_PATHS, ROUTES } from './config';
import { authRouter } from './middlewares/authRouter';
import { graphqlMiddleware } from './middlewares/graphqlMiddleware';
import { notificationMiddleware } from './middlewares/notificationMiddleware';

export const router = Router();

router.get(ROUTES.ROOT, (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(HTML_PATHS.APP);
  } else {
    res.redirect(ROUTES.AUTH);
  }
});
router.get(ROUTES.DEMO, (_, res) => {
  res.sendFile(HTML_PATHS.APP);
});
router.get(ROUTES.LOGOUT, (req, res) => {
  req.logout();
  res.redirect(ROUTES.ROOT);
});
router.get(ROUTES.AUTH, (_, res) => res.sendFile(HTML_PATHS.LOGIN));

router.use(ROUTES.AUTH, authRouter);
router.use(ROUTES.GRAPHQL, cors(), graphqlMiddleware);
router.use(ROUTES.NOTIFICATIONS, cors(), notificationMiddleware);
