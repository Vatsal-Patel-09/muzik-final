const mongoose = require("mongoose");
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    instructor: String,
}, { timestamps: true });
module.exports = mongoose.model("Course", CourseSchema);
