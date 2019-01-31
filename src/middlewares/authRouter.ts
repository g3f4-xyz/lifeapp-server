import { Router } from 'express';

import { googleRouter } from './auth/google';

export const authRouter = Router();

authRouter.use(googleRouter);
