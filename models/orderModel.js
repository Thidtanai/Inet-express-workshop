const mongoose = require("mongoose");

const orders = new mongoose.Schema(
  {
    order_qty: { type: String, required: [true, "Order quantity is required"] },
    order_price: { type: Number, required: [true, "Order price is required"] },
    order_status: { type: String },
    product_id: [String],
    orderby: { type: String, required: [true, "Order user id is required"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orders", orders);
