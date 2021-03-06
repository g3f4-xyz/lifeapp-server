import * as passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { HOST, ROUTES, SUB_ROUTES } from './config';
import UserService from './services/UserService';

export default (userService: UserService) => {
  passport.use(
    new GoogleStrategy(
      {
        // #TODO to powinno pochodzić z procesu albo konfiguracji
        clientID:
          '84842929925-8b9p5173tjtkrttoabdb4ofg670rhfqa.apps.googleusercontent.com',
        clientSecret: 'zW2ebcvBaxAZFqMu00OTb9-d', // #TODO jw.
        callbackURL: `${HOST}${ROUTES.AUTH}${SUB_ROUTES.GOOGLE_LOGGED}`,
      },
      async (_accessToken: any, _refreshToken: any, profile: any, cb: any) => {
        await userService.addUser({
          userId: profile.id,
          info: {
            name: profile.displayName,
            photo: profile._json.picture,
            provider: profile.provider,
          },
        });

        cb(null, {
          id: profile.id,
          picture: profile._json.picture,
          displayName: profile.displayName,
          provider: profile.provider,
        });
      },
    ),
  );

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    done(null, { id });
  });
};
