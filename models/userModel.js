const mongoose = require("mongoose");
const users = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "Username is already used"],
      required: [true, "Username is required"],
      minlength: [3, "Username must be at least 3 character long"],
    },
    password: { type: String, required: [true, "Password is required"] },
    email: {
      type: String,
      unique: [true, "Email is already used"],
      required: [true, "Email is required"],
    },
    is_approve: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "user", "seller"] },
    user_info: {
      firstname: { type: String },
      lastname: { type: String },
      gender: { type: String, enum: ["male", "female", "other"] },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users);
