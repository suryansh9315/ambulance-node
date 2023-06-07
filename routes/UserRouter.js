const router = require("express").Router();
const { loginWithPhoneOtp, verifyOtp } = require("../controllers/auth.controller");
const { welcome, updateUser } = require("../controllers/user.controller");
const checkAuth = require("../middlewares/checkAuth");

router.post("/login-with-phone", loginWithPhoneOtp);

router.post("/verify", verifyOtp);

router.get("/welcome", checkAuth, welcome);

router.post("/update", checkAuth, updateUser);

module.exports = router;
