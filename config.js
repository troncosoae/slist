const mongoose = require('mongoose');

// mongodb atlas connections...
mongoose
  .connect(process.env.DB_HOST, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true
  }).then(() => {
      console.log('Mongodb connected...');
  });

  module.exports = mongoose;
