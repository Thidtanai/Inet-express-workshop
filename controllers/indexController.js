const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = require("../models/userModel");
const tokenBlacklist = require("../utils/tokenBlacklist");

/* GET home page. */
exports.main = (req, res, next) => {
  res.render("index", { title: "Express" });
};

// login
exports.userLogin = async (req, res, next) => {
  try {
    let { password, username } = req.body;

    let user = await userSchema.findOne({
      username: username,
    });
    if (!user) {
      return res.status(400).send({
        message: "User not found",
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).send({
        message: "Password was wrong",
        success: false,
      });
    }

    // check is approve
    if (!user.is_approve) {
      return res.status(400).send({
        message: "Account is not approve",
        success: false,
      });
    }

    const { id, role } = user;
    const token = jwt.sign({ id, username, role }, process.env.JWT_KEY);
    return res.status(201).send({
      data: { id, username, role, token },
      message: "Login success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Login fail",
      success: false,
    });
  }
};

// logout
exports.userLogout = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];

    if (token) {
      tokenBlacklist.add(token);
      return res.status(200).send({
        message: "Logout successful",
        success: true,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: "No token provided",
      success: false,
    });
  }
};
