const passport = require('passport');
const { SUB_ROUTES, ROUTES } = require('../../config');

module.exports = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/plus.login',
  ],
  prompt : 'select_account',
  name: 'lifeapp-local',
});

module.exports = {
  [SUB_ROUTES.GOOGLE_AUTH]: passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
    ],
    prompt : 'select_account',
    name: 'lifeapp-local',
  }),
  [SUB_ROUTES.GOOGLE_LOGGED]: passport.authenticate('google', { successRedirect: ROUTES.ROOT, failureRedirect: ROUTES.AUTH }),
};
