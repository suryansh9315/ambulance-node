const {
  AUTH_TOKEN_MISSING_ERR,
  AUTH_HEADER_MISSING_ERR,
  JWT_DECODE_ERR,
  USER_NOT_FOUND_ERR,
} = require("../error");
const { verifyJwtToken } = require("../utils/token");
const User = require('../models/User')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      next({ status: 403, message: AUTH_HEADER_MISSING_ERR });
      return;
    }

    const userId = verifyJwtToken(token, next);
    if (!userId) {
      next({ status: 403, message: JWT_DECODE_ERR });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      next({ status: 404, message: USER_NOT_FOUND_ERR });
      return;
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
