const orderSchema = require("../models/orderModel");

// get all order
exports.getAllOrder = async (req, res, next) => {
  try {
    let order = await orderSchema.find();

    return res.status(200).send({
      data: order,
      message: "Get all order success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Get all order fail",
      success: false,
    });
  }
};

// create order
exports.createOrderByProduct = async (obj) => {
  try {
    let newOrder = new orderSchema(obj);
    let order = await newOrder.save();
    return order.id;
  } catch (error) {
    return res.status(500).send({
      message: "Create order fail",
      success: false,
    });
  }
};
