const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {}, // No predefined fields, completely raw
  { timestamps: true, strict: false } // `strict: false` allows any data structure
);

module.exports = mongoose.model("Payment", PaymentSchema);
