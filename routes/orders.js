var express = require("express");
var router = express.Router();

const { getAllOrder } = require("../controllers/orderController");

/* GET orders listing. */
router.get("/", getAllOrder);

module.exports = router;
