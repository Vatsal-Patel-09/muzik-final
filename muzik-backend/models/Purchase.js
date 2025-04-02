const mongoose = require("mongoose");
const PurchaseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    purchaseDate: { type: Date, default: Date.now },
}, { timestamps: true });
module.exports = mongoose.model("Purchase", PurchaseSchema);