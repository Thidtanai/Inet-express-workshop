const bcrypt = require("bcrypt");

const userSchema = require("../models/userModel");
const { getAuthData } = require("../services/authorize");

/* GET users listing. */
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await userSchema.find();
    return res.status(200).send({
      data: user,
      message: "Get user success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Get user fail",
      success: false,
    });
  }
};

// create user
exports.createUser = async (req, res, next) => {
  try {
    let { username, password, role, user_info, email } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({
      username,
      password: hashPassword,
      role,
      email,
      user_info,
    });

    const user = await newUser.save();
    return res.status(201).send({
      data: { user },
      message: "Create user success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Create user fail",
      success: false,
    });
  }
};

// approve user
exports.approveUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_approve } = req.body;
    const { authRole } = getAuthData(req, res);

    // check role
    console.log(authRole);
    if (authRole !== "admin") {
      return res.status(401).send({
        message: "You are not admin",
        success: false,
      });
    }

    await userSchema.findByIdAndUpdate(id, { is_approve });
    let user = await userSchema.findById(id);
    return res.status(200).send({
      data: { _id: id, username: user.username, is_approve: user.is_approve },
    });
  } catch (error) {
    return res.status(500).send({
      message: "Change approvement fail",
      success: false,
    });
  }
};

// delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authRole } = getAuthData(req, res);

    if (authRole !== "admin") {
      return res.status(401).send({
        message: "You are not admin",
        success: false,
      });
    }

    await userSchema.findByIdAndDelete(id);
    let user = await userSchema.find();
    return res.status(200).send({
      data: user,
      message: "Delete user complete",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Delete user fail",
      success: false,
    });
  }
};
