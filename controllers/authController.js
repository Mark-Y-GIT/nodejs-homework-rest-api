const {
  authService: { registerUser },
} = require('../services');

const registerUserController = async (req, res, next) => {
  try {
    const { email, subscription } = await registerUser(req.body);

    res.status(201).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUserController };
