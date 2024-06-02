let { Router } = require('express');
let validations = require('./validations');
let controllers = require('./controllers');
const { fileUploader } = require('../helpers');
let auth = require('../auth');
let router = Router();

router.post(
  '/register',
  validations.register,
  controllers.register
);

router.post('/login', validations.login, controllers.login);

router.get(
  '/profile',
  auth.authorize,
  controllers.getProfile
);

module.exports = router;
