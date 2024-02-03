const mongoose = require('mongoose');
require('dotenv').config();

const mongoDB = mongoose.connect(process.env.MONGODB_URI, {
});

module.exports = mongoDB;
