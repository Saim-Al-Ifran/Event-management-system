require('dotenv').config();

const mongoDbUrl= process.env.MONGODB_URL;
const nodeEnv   = process.env.NODE_PRODUCTION;
const secretKey = process.env.JWT_SECRET_KEY;


module.exports = {
    nodeEnv,
    secretKey,
    mongoDbUrl
}