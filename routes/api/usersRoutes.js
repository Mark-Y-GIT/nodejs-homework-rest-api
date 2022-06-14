const express = require('express');
const usersRouter = express.Router();
const {
  userValidation: { userRequestValidation, userSubValidation, auth },
} = require('../../middleware');
const {
  usersController: {
    registerUserController,
    loginUserController,
    logoutUserController,
    currentUserController,
    subUpdateUserController,
  },
} = require('../../controllers/');

usersRouter.post('/signup', userRequestValidation, registerUserController);

usersRouter.post('/login', userRequestValidation, loginUserController);

usersRouter.get('/logout', auth, logoutUserController);

usersRouter.get('/current', auth, currentUserController);

usersRouter.patch('/:userId', auth, userSubValidation, subUpdateUserController);

module.exports = usersRouter;
