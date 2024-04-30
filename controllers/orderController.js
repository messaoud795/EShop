const Product = require("../models/product");
const Order = require("../models/order");
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// add an order /api/order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.create({
    ...req.body,
    paidAt: Date.now(),
    user: req.user._id,
  });
  res.status(200).send({
    success: true,
    order,
  });
});

// get one order /api/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order)
    return next(new errorHandler("Order not found with this id", 404));
  res.status(200).send({
    success: true,
    order,
  });
});

// get loggedin user orders /api/orders/me
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).send({
    success: true,
    orders,
  });
});

// get all orders /api/admin/orders
exports.allOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => (totalAmount += order.totalPrice));
  res.status(200).send({
    success: true,
    totalAmount,
    orders,
  });
});

// update order process /api/admin/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order)
    return next(new errorHandler("Order not found with this id", 404));

  if (order.orderStatus === "Delivered")
    return next(new errorHandler("You have already deliverd this order", 400));

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).send({
    success: true,
    order,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

//delete an order => api/admin/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).send({
      success: false,
      message: "order not found",
    });

  await order.remove();

  res.status(200).send({
    success: true,
    message: "order is deleted",
  });
});
