import * as passport from 'passport';
// @ts-ignore
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { HOST, ROUTES, SUB_ROUTES } from './config';

passport.use(new GoogleStrategy({
  // #TODO to powinno pochodzić z procesu albo konfiguracji
  clientID: '84842929925-8b9p5173tjtkrttoabdb4ofg670rhfqa.apps.googleusercontent.com',
  clientSecret: 'zW2ebcvBaxAZFqMu00OTb9-d', // #TODO jw.
  callbackURL: `${HOST}${ROUTES.AUTH}${SUB_ROUTES.GOOGLE_LOGGED}`,
},
(_: any, __: any, profile: any, cb: any) => {
  cb(null, { id: profile.id });
}));

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done: any) => {
  done(null, { id });
});
