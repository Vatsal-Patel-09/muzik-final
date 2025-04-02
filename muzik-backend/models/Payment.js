const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: Number,
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
}, { timestamps: true });
module.exports = mongoose.model("Payment", PaymentSchema);
