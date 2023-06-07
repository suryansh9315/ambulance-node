const User = require("../models/User");
const {
  PHONE_NOT_FOUND_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../error");

exports.welcome = async (req, res, next) => {
  res.status(200).send("Welcome 🙌 ");
};

exports.updateUser = async (req, res, next) => {
  const user = req.user
  user.name = req.body.name
  user.home_address = req.body.home_address
  user.image = req.body.image
  await user.save()
  res.status(200).json({ status: "success", user });
}
