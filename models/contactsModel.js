const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('contact', contactSchema);

const postSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().required(),
  phone: Joi.number().min(5).required(),
  favorite: Joi.bool().default(false),
});

const updateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or('name', 'email', 'phone');

const idSchema = Joi.object({ contactId: Joi.string().required() });

const statusUpdateSchema = Joi.object({ favorite: Joi.bool().required() });

module.exports = {
  Contact,
  postSchema,
  updateSchema,
  idSchema,
  statusUpdateSchema,
};
