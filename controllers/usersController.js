const {
  userService: {
    registerUser,
    loginUser,
    logoutUser,
    updateSubStatus,
    uploadAvatar,
    verifyUser,
    reVerification,
  },
  imageService: { imageMod },

  emailService: { sendEmail },
} = require('../services');

const registerUserController = async (req, res, next) => {
  try {
    const { email, subscription, avatarURL, verificationToken } =
      await registerUser(req.body);

    await sendEmail(email, verificationToken);

    res.status(201).json({
      user: {
        email,
        subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { token, user } = await loginUser(req.body);

    const { email, subscription } = user;

    res.json({
      token,
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logoutUserController = async (req, res, next) => {
  try {
    await logoutUser(req.user._id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const currentUserController = async (req, res, next) => {
  try {
    const currentUser = req.user;

    res.json({
      email: currentUser.email,
      subscription: currentUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

const subUpdateUserController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { body } = req;

    const updatedContact = await updateSubStatus({ userId, body });

    if (updatedContact) {
      res.json({
        email: updatedContact.email,
        subscription: updatedContact.subscription,
      });
      return;
    }

    res.status(404).json({ message: 'Not found' });
  } catch (error) {
    next(error);
  }
};

const avatarUpdateUserController = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const { file } = req;

    const modifiedImage = await imageMod({ id, file });

    await uploadAvatar(id, {
      avatarURL: modifiedImage,
    });

    res.json({
      avatarURL: modifiedImage,
    });
  } catch (error) {
    next(error);
  }
};

const verifyUserController = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await verifyUser({ verificationToken });

    if (user) {
      res.json({ message: 'Verification successful' });
      return;
    }

    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    next(error);
  }
};

const reVerificationUserController = async (req, res, next) => {
  try {
    const user = await reVerification(req.body);

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    const { verify, verificationToken, email } = user;

    if (user && !verify) {
      await sendEmail(email, verificationToken);

      res.json({
        message: 'Verification email sent',
      });
      return;
    }

    res.status(400).json({
      message: 'Verification has already been passed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
  subUpdateUserController,
  avatarUpdateUserController,
  verifyUserController,
  reVerificationUserController,
};
