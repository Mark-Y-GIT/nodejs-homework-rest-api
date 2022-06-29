const { Schema, model } = require('mongoose');
const Joi = require('joi');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, {}, true);
      },
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
      default: uuidv4(),
    },
  },
  { timestamps: true },
);

const User = model('user', userSchema);

const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const statusSubUpdateSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const reVerificationUserSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  User,
  registerSchema,
  statusSubUpdateSchema,
  reVerificationUserSchema,
};
