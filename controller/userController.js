/* to avoid writing try and catch inside async block */
const asyncHandler = require("express-async-handler");
const encryption = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const emailCheck = await userModel.findOne({ email });
  if (emailCheck) {
    res.status(400);
    throw new Error("Please enter new email");
  }
  const hashPassword = await encryption.hash(password, 10);
  const user = await userModel.create({
    userName,
    email,
    password: hashPassword,
  });
  res.status(201).json({ id: user._id, email: user.email });
});

//@desc logIn user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await userModel.findOne({ email });
  if (user && encryption.compare(password, user.hashPassword)) {
    const accessToken = jwt.sign(
      {
        user: {
          email: user.email,
          userName: user.userName,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json(accessToken);
  } else {
    res.status(401);
    throw new Error("Please enter valid email & password");
  }
});

//@desc Get loggedIn user
//@route GET /api/users/loggedin
//@access private
const loggedInUser = asyncHandler(async (req, res) => {
  // const
  res.status(200).json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  loggedInUser,
};
