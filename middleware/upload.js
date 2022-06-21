const multer = require('multer');
const { createError } = require('../helpers');

const {
  constants: { TMP_PATH },
} = require('../helpers');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(createError(400, 'Wrong format'));
    }
  },
  limits: { fieldNameSize: 20 },
});

const uploadImage = upload.single('avatar');

module.exports = { uploadImage };
