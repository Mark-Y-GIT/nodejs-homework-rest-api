const sgMail = require('@sendgrid/mail');
const {
  env: { SENDGRID_API_KEY, PORT },
} = require('../helpers');

const BASE_URL = `http://localhost:${PORT}/api/v1`;

const sendEmail = async (userEmail, verificationToken) => {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const link = `${BASE_URL}/users/verify/${verificationToken}`;

  const msg = {
    to: userEmail,
    from: 'yakushyn.mark@gmail.com',
    subject: 'Confirm your email',
    html: `<h4>
        <a href=${link}>Click to confirm registration</a>
      </h4>`,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendEmail };
