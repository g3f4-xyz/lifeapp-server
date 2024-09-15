import { Router } from 'express';
import { ROUTES } from './config';
import { graphqlMiddleware } from './middlewares/graphqlMiddleware';

export const router = Router();

router.use(ROUTES.GRAPHQL, graphqlMiddleware);
