const mongoose = require('mongoose');
const { MONGO_URI } = require('../utils/config');

const connectDB = () => {
    return mongoose.connect(MONGO_URI);
};

module.exports = connectDB;