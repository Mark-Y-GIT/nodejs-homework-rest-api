const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();
const {
  env: { PORT = 3050, DB_HOST },
} = require('./helpers');

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch(err => {
    console.log('ERROR', err.message);
    process.exit(1);
  });
