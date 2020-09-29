import { Router } from 'express';
import * as passport from 'passport';
import { SUB_ROUTES } from '../config';

export const authRouter = Router();

const googleMiddleware = (req: any, res: any) => {
  const io = req.app.get('io');
  const user = {
    name: req.user.displayName,
    photo: req.user.picture,
  };

  io.in(req.session.socketId).emit('google', user);
  res.end();
};

const googleAuth = passport.authenticate('google', { scope: ['profile'] });

authRouter.get(SUB_ROUTES.GOOGLE_LOGGED, googleAuth, googleMiddleware);

authRouter.use((req: any, _res: any, next: any) => {
  req.session.socketId = req.query.socketId;
  next();
});

authRouter.get(SUB_ROUTES.GOOGLE_AUTH, googleAuth);
