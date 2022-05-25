require('dotenv').config();

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_LIFETIME = process.env.JWT_LIFETIME;

const NODE_ENV = process.env.NODE_ENV || 'development';
let MONGO_URI;
if (NODE_ENV === 'development') {
    MONGO_URI = process.env.MONGO_URI_DEV;
} else if (NODE_ENV === 'production') {
    MONGO_URI = process.env.MONGO_URI_PROD;
} else {
    MONGO_URI = process.env.MONGO_URI_TEST;
}

module.exports = {
    PORT,
    NODE_ENV,
    MONGO_URI,
    JWT_SECRET,
    JWT_LIFETIME,
};