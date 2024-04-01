const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please add the user name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
      unique: [true, "Email already exist"]
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", userSchema);
