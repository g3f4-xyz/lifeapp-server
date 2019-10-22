import { Router } from 'express';
import { ROUTES } from './config';
import { authRouter } from './middlewares/authRouter';
import { graphqlMiddleware } from './middlewares/graphqlMiddleware';
import { notificationMiddleware } from './middlewares/notificationMiddleware';

export const router = Router();

router.get(ROUTES.LOGOUT, (req, res) => {
  req.logout();

  res.status(200);
  res.end();
});

router.use(ROUTES.AUTH, authRouter);
router.use(ROUTES.GRAPHQL, graphqlMiddleware);
router.use(ROUTES.NOTIFICATIONS, notificationMiddleware);
