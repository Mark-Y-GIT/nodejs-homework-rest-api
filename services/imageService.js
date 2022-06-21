const path = require('path');
const Jimp = require('jimp');
const fs = require('fs').promises;
const {
  constants: { AVATAR_PATH, PUBLIC_PATH },
} = require('../helpers/index');

const imageMod = async ({ id, file }) => {
  const avatarURL = path.join(
    AVATAR_PATH,
    `${id}${path.extname(file.originalname)}`,
  );

  const writePath = path.join(PUBLIC_PATH, avatarURL);

  Jimp.read(file.path, (err, image) => {
    if (err) throw err;
    image.resize(256, 256).write(writePath);
  });

  await fs.unlink(file.path);

  return avatarURL.replace(/\\/g, '/');
};
module.exports = { imageMod };
