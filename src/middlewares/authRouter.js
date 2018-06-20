const express = require('express');

const { SUB_ROUTES } = require('../config');
const googleMiddlewares = require('./auth/google');

const router = express.Router();

router.get(SUB_ROUTES.GOOGLE_AUTH, googleMiddlewares[SUB_ROUTES.GOOGLE_AUTH]);
router.get(SUB_ROUTES.GOOGLE_LOGGED, googleMiddlewares[SUB_ROUTES.GOOGLE_LOGGED]);

module.exports = router;
