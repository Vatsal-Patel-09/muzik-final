const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    email: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    order_id: {
        type: String,
        required: true
    },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    receipt: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: false
    },
    razorpay_signature: {
        type: String,
        required: false
    }
}, { timestamps: true });
module.exports = mongoose.model("Payment", PaymentSchema);
