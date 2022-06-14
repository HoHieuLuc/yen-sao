const { MONGO_URI } = require('../utils/config');
const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(MONGO_URI);
};

module.exports = connectDB;