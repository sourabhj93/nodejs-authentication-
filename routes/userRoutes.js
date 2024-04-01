const express = require("express");
const {
  registerUser,
  loginUser,
  loggedInUser,
} = require("../controller/userController");
const authHandler = require("../middleware/authHandler");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/loggedin", authHandler, loggedInUser);

module.exports = router;
