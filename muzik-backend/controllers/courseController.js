const Course = require("../models/Course");
exports.getCourses = async (req, res) => {
    const courses = await Course.find({});
    res.json(courses);
};
exports.addCourse = async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
};
