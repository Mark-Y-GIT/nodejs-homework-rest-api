const createError = require('../errors');
const {
  postSchema,
  updateSchema,
  idSchema,
  statusUpdateSchema,
} = require('../models/contactsModel');

const createContactValidation = (req, _, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    next(
      createError(
        400,
        (error.message = `missing required ${error.message
          .replace(/"/g, '')
          .replace(/is required/g, 'field')}`),
      ),
    );
  }
  next();
};

const updateContactByIdValidation = (req, _, next) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    next(createError(400, (error.message = 'missing fields')));
  }
  next();
};

const deleteContactValidation = (req, _, next) => {
  const { error } = idSchema.validate(req.params);

  if (error) {
    next(createError(400, error.message.replace(/"/g, '')));
  }
  next();
};

const favoriteContactToggleValidation = (req, _, next) => {
  const { error } = statusUpdateSchema.validate(req.body);

  if (error) {
    next(createError(400, (error.message = 'missing field favorite')));
  }
  next();
};

module.exports = {
  createContactValidation,
  updateContactByIdValidation,
  deleteContactValidation,
  favoriteContactToggleValidation,
};
