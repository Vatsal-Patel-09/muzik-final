const express = require("express");
const paymentController = require("../controllers/paymentController");
const router = express.Router();

const { create_razorpay_order, verify_razorpay_order, capture_razorpay_payment_response } = require("../controllers/razorPayGateway");

router.post("/create_razorpay_order", create_razorpay_order);
router.post("/get_razorpay_order_status", verify_razorpay_order)
router.post("/capture_razorpay_payment_response", capture_razorpay_payment_response)

module.exports = router;