const { getAuthData } = require("../services/authorize");

const productSchema = require("../models/productModel");

// get all product
exports.getAllProduct = async (req, res, next) => {
  try {
    let products = await productSchema.find();
    return res.status(200).send({
      data: products,
      message: "Get all product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Get all prouduct fail",
      success: false,
    });
  }
};

// get one product
exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product = await productSchema.findById(id);
    // check product not found
    if (!product) {
      return res.status(400).send({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).send({
      data: product,
      message: "Get product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Get product fail",
      success: false,
    });
  }
};

// get order from product
exports.getProductOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await productSchema.findById(id);

    return res.status(200).send({
      data: product.order_id,
      message: "Get order from product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Get order from product fail",
      success: false,
    });
  }
};

// create product
exports.createProduct = async (req, res, next) => {
  try {
    let newProduct = new productSchema(req.body);
    let product = await newProduct.save();
    return res.status(201).send({
      data: product,
      message: "Create product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Create product fail",
      success: false,
    });
  }
};

// add order to product
const { createOrderByProduct } = require("./orderController");
exports.addProductOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    let product = await productSchema.findById(id);
    // check find product
    if (!product) {
      return res.status(400).send({
        message: "Product not found",
        success: false,
      });
    }
    // check can add order
    if (req.body.order_qty > product.product_stock) {
      return res.status(400).send({
        message: "Product is insufficient",
        success: false,
      });
    }
    if (req.body.order_qty <= 0) {
      return res.status(400).send({
        message: "Please add order quantity again",
        success: false,
      });
    }

    //get data from auth
    const { authUsername } = getAuthData(req, res);

    // create order
    let newOrder = {
      ...req.body,
      order_price: req.body.order_qty * product.product_price,
      product_id: id,
      orderby: authUsername,
    };
    let order_id = await createOrderByProduct(newOrder);
    // add order id to product
    product.order_id.push(order_id);
    product.product_stock = product.product_stock - req.body.order_qty;
    let updatedProduct = await product.save();

    return res.status(201).send({
      data: updatedProduct,
      message: "Add order success",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Add order fail",
      success: false,
    });
  }
};

// edit product
exports.editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productSchema.findByIdAndUpdate(id, req.body);
    let product = await productSchema.findById(id);
    return res.status(200).send({
      data: product,
      message: "Edit product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Edit product fail",
      success: false,
    });
  }
};

// delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await productSchema.findByIdAndDelete(id);
    let product = await productSchema.find();
    return res.status(200).send({
      data: product,
      message: "Delete product success",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Delete product fail",
      success: false,
    });
  }
};
