const createError = require('../errors');
const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');

const registerUser = async userData => {
  const { email, password } = userData;
  const result = await User.findOne({ email });

  if (result) {
    throw createError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...userData, password: hashedPassword });

  return newUser;
};

module.exports = { registerUser };
