import { Router } from 'express';
import { authenticate } from 'passport';

import { ROUTES, SUB_ROUTES } from '../../config';

export const googleRouter = Router();

googleRouter.get(SUB_ROUTES.GOOGLE_AUTH, authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
  ],
  prompt : 'select_account',
}));
googleRouter.get(SUB_ROUTES.GOOGLE_LOGGED, authenticate('google', {
  successRedirect: ROUTES.ROOT,
  failureRedirect: ROUTES.AUTH,
}));
