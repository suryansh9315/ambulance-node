const User = require("../models/User");
const {
  PHONE_NOT_FOUND_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../error");
const { createJwtToken } = require("../utils/token");
const { generateOTP } = require("../utils/otp");
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_ADMIN_PHONE,
  TWILIO_AUTH_TOKEN,
} = require("../config");
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.loginWithPhoneOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    let user = await User.findOne({ phone });

    if (!user) {
      const homeAddress = "Home Address"
      const name = "User"
      const image = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      user = await User.create({ phone, home_address: homeAddress, name, image });
    }

    const otp = generateOTP(4);
    user.phone_otp = otp;
    await user.save();

    const message = await client.messages.create({
      body: `Your OTP for Ambulance App Login is ${otp}`,
      from: TWILIO_ADMIN_PHONE,
      to: "+91" + phone,
    });

    res.status(201).json({
      type: "success",
      message: "OTP sended to your registered phone number",
      data: {
        message,
      },
    });

    next;
  } catch (error) {
    next(error);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    const user = await User.findOne({ phone });
    if (user.phone_otp === otp) {
      // user.phone_otp = "";
      const token = createJwtToken({ userId: user._id });
      // await user.save();
      res.status(201).json({
        type: "success",
        data: {
          token,
          user: {
            name: user.name,
            home_address: user.home_address,
            image: user.image
          }
        },
      });
      return;
    }

    res.status(401).json({
      type: "failure",
      message: "Wrong OTP",
    });

    next;
  } catch (error) {
    next(error);
  }
};
