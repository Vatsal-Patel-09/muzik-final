const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment")

const razorpay = new Razorpay({
    key_id: 'rzp_test_4qm51zu31eNS4J',
    key_secret: 'jxY1odIwT0rriALW2N1B6voa',
});


const create_razorpay_order = async (req, res) => {
    try {
        console.log("req", req?.body)
        const options = {
            amount: req.body.amount * 100, // Amount in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        const create_payment = await Payment.create({
            userId: req.body?.email,
            amount: order?.amount,
            order_id: order?.id,
            receipt: order?.receipt,
            status: "pending"
        })
        res.json(order);
    } catch (error) {
        console.log("error", error)
        res.status(500).json({ error: error.message });
    }
}


const verify_razorpay_order = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("razorpay_order_id, razorpay_payment_id, razorpay_signature", razorpay_order_id, razorpay_payment_id, razorpay_signature)

    const hmac = crypto.createHmac("sha256", 'jxY1odIwT0rriALW2N1B6voa');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
        const create_payment = await Payment.findOneAndUpdate({
            order_id: razorpay_order_id
        }, {
            razorpay_payment_id: razorpay_payment_id,
            razorpay_signature: razorpay_signature,
            status: "success"
        })
        console.log("create_payment", create_payment)
        res.json({ success: true, message: "Payment verified successfully" });
    } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
    }
}




const RAZORPAY_SECRET = "muzikskillhub"; // Replace with your actual Razorpay Secret Key

const capture_razorpay_payment_response = async (req, res) => {
    try {
        console.log("Webhook received:", req.body); // Debugging

        // Extract the Razorpay signature from the request header
        const receivedSignature = req.headers["x-razorpay-signature"];

        // Verify signature
        const expectedSignature = crypto
            .createHmac("sha256", RAZORPAY_SECRET)
            .update(JSON.stringify(req.body))
            .digest("hex");

        if (expectedSignature !== receivedSignature) {
            console.log("⚠️ Webhook signature mismatch!");
            return res.status(400).json({ error: "Invalid signature" });
        }

        console.log("✅ Webhook signature verified");

        // Store the full webhook response in the database
        const payment = await Payment.create(req.body);
        console.log("Payment saved:", payment);

        res.status(200).json({ status: "success", payment });
    } catch (error) {
        console.error("🚨 Error processing webhook:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { capture_razorpay_payment_response };


module.exports = {
    create_razorpay_order,
    verify_razorpay_order,
    capture_razorpay_payment_response
}