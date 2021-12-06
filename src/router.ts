import { Router } from 'express';
import { ROUTES } from './config';
import checkJwt from './middlewares/checkJwt';
import { graphqlMiddleware } from './middlewares/graphqlMiddleware';
import { notificationMiddleware } from './middlewares/notificationMiddleware';

export const router = Router();

router.use(ROUTES.GRAPHQL, graphqlMiddleware);
router.use(ROUTES.NOTIFICATIONS, notificationMiddleware);
