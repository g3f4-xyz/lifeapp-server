const express = require('express');
const cors = require('cors');
const { HTML_PATHS, ROUTES } =  require('./config');
const authRouter = require('./middlewares/authRouter');
const notifications = require('./middlewares/notifications');
const graphql = require('./middlewares/graphql');

const router = express.Router();

router.get(ROUTES.ROOT, (req, res) => {
  if (req.isAuthenticated()) {
    res.sendFile(HTML_PATHS.APP);
  } else {
    res.redirect(ROUTES.AUTH);
  }
});
router.get(ROUTES.DEMO, (req, res) => {
  res.sendFile(HTML_PATHS.APP);
});
router.get(ROUTES.LOGOUT, (req, res) => {
  req.logout();
  res.redirect(ROUTES.ROOT);
});
router.get(ROUTES.AUTH, (req, res) => res.sendFile(HTML_PATHS.LOGIN));

router.use(ROUTES.AUTH, authRouter);
router.use(ROUTES.GRAPHQL, cors(), graphql);
router.use(ROUTES.NOTIFICATIONS, notifications);

module.exports = router;
