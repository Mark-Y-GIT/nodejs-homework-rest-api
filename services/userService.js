const { createError } = require('../helpers');
const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  env: { JWT_KEY },
} = require('../helpers');

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

const generateToken = payload =>
  jwt.sign(payload, JWT_KEY, { expiresIn: '1h' });

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (user && !user.verify) {
    throw createError(401, 'Please confirm your email');
  }

  if (!user) {
    throw createError(401, 'Email or password is wrong');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw createError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
    subscription: user.subscription,
  };

  const token = generateToken(payload);

  await User.findByIdAndUpdate(user._id, { token });

  return { token, user };
};

const authenticateUser = async token => {
  try {
    const payload = jwt.verify(token, JWT_KEY);

    const { id } = payload;

    return await User.findById(id);
  } catch (error) {
    return null;
  }
};

const logoutUser = async id => {
  const user = await User.findByIdAndUpdate(id, { token: null });

  if (!user) {
    throw createError(401, 'Not authorized');
  }
  return user;
};

const updateSubStatus = async ({ userId, body }) => {
  return await User.findByIdAndUpdate(userId, body, {
    new: true,
  });
};

const uploadAvatar = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const verifyUser = async ({ verificationToken }) => {
  const verifyUserResponse = await User.findOneAndUpdate(
    { verificationToken, verify: false },
    { verify: true, verificationToken: null },
  );

  return verifyUserResponse;
};

const reVerification = async ({ email }) => {
  const reVerifyUserResponse = await User.findOne({ email });

  return reVerifyUserResponse;
};

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
  updateSubStatus,
  uploadAvatar,
  verifyUser,
  reVerification,
};
