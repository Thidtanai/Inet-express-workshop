var express = require("express");
var router = express.Router();

const {
  getAllProduct,
  createProduct,
  editProduct,
  deleteProduct,
  getProduct,
  addProductOrder,
  getProductOrder,
} = require("../controllers/productController");

router.get("/", getAllProduct);
router.get("/:id", getProduct);
router.get("/:id/orders", getProductOrder);
router.post("/", createProduct);
router.post("/:id/orders", addProductOrder);
router.put("/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
