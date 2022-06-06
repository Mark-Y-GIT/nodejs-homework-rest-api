const Joi = require('joi');

const postSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(5).required(),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

const idSchema = Joi.object({ contactId: Joi.string().required() });

module.exports = { postSchema, updateSchema, idSchema };
