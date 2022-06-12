const express = require('express');
const usersRouter = express.Router();
const {
  userValidation: { registrationValidation },
} = require('../../validation');
const {
  authController: { registerUserController },
} = require('../../controllers/');

usersRouter.post('/', registrationValidation, registerUserController);

module.exports = usersRouter;
