const { createError } = require('../helpers');

const {
  registerSchema,
  statusSubUpdateSchema,
  reVerificationUserSchema,
} = require('../models/userModel');

const {
  userService: { authenticateUser },
} = require('../services/');

const userRequestValidation = (req, _, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    next(createError(400, error.message.replace(/"/g, '')));
  }
  next();
};

const auth = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createError(401, 'Not authorized'));
  }

  const user = await authenticateUser(token);

  if (!user || !user.token) {
    next(createError(401, 'Not authorized'));
  }

  req.user = user;
  next();
};

const userSubValidation = (req, _, next) => {
  const { error } = statusSubUpdateSchema.validate(req.body);

  if (error) {
    next(createError(400, error.message.replace(/"/g, '')));
  }
  next();
};

const userValidationRequest = (req, _, next) => {
  const { error } = reVerificationUserSchema.validate(req.body);

  if (error) {
    next(createError(400, error.message.replace(/"/g, '')));
  }
  next();
};

module.exports = {
  userRequestValidation,
  userSubValidation,
  userValidationRequest,
  auth,
};
