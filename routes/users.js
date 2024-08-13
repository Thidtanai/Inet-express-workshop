var express = require("express");
var router = express.Router();

const jwt_decode = require("../middlewares/jwt_decode");
const { getAllUser, deleteUser } = require("../controllers/userController");

/* GET users listing. */
router.get("/", getAllUser);
router.delete("/:id", jwt_decode, deleteUser);

module.exports = router;
