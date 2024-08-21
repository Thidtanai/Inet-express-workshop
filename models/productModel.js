const mongoose = require("mongoose");

const products = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: [true, "Product name is required"],
      unique: true,
    },
    product_stock: {
      type: Number,
      required: [true, "product Stock is required"],
    },
    product_price: {
      type: Number,
      required: [true, "Product price is required"],
    },
    product_owner: {
      type: String,
      required: [true, "Product need owner"],
      default: "66bb835365ada094def4675a",
    },
    product_description:{
      type: String,
    },
    product_img: {
      type: String,
    },
    order_id: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("products", products);
