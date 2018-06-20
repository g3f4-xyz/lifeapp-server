const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const { HOST, ROUTES, SUB_ROUTES } = require('./config');

passport.use(new GoogleStrategy({
  clientID: '84842929925-8b9p5173tjtkrttoabdb4ofg670rhfqa.apps.googleusercontent.com', // #TODO to powinno pochodzić z procesu albo konfiguracji
  clientSecret: 'zW2ebcvBaxAZFqMu00OTb9-d', // #TODO jw.
  callbackURL: `${HOST}${ROUTES.AUTH}${SUB_ROUTES.GOOGLE_LOGGED}`,
},
(accessToken, refreshToken, profile, cb) => {
  cb(null, { id: profile.id });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, { id });
});
