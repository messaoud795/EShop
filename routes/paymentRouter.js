const express = require("express");
const {
  processPayment,
  sendStripeApi,
} = require("../controllers/paymentController");

const { isUserAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/payment/process").post(isUserAuthenticated, processPayment);
router.route("/stripeapi").get(isUserAuthenticated, sendStripeApi);

module.exports = router;
