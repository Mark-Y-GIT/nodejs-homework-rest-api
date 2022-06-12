const createError = require('../errors');

const { registerSchema } = require('../models/userModel');

const registrationValidation = (req, _, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    next(createError(400, error.message.replace(/"/g, '')));
  }
  next();
};

module.exports = { registrationValidation };
