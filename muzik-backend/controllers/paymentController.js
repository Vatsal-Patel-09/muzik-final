const Payment = require("../models/Payment");
exports.processPayment = async (req, res) => {
    const newPayment = new Payment(req.body);
    await newPayment.save();
    res.status(201).json(newPayment);
};