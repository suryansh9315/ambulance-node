const dotenv = require("dotenv");
dotenv.config()

exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;

exports.JWT_SECRET = process.env.JWT_SECRET;

exports.TWILIO_ADMIN_PHONE = process.env.TWILIO_ADMIN_PHONE
exports.TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
exports.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
