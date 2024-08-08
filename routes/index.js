var express = require("express");
var router = express.Router();

const { userLogin, userLogout } = require("../controllers/indexController");
const { createUser, approveUser } = require("../controllers/userController");
const jwt_decode = require("../middlewares/jwt_decode");


router.post("/login", userLogin);
router.post("/logout", userLogout);
router.post("/register", createUser);
router.put("/approve/:id", jwt_decode, approveUser);

module.exports = router;
