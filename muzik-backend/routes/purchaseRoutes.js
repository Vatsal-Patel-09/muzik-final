const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route - Get purchased courses for logged-in user
router.get("/my-courses", authMiddleware, purchaseController.getUserPurchases);

// Purchase a course (Requires Authentication)
router.post("/", authMiddleware, purchaseController.purchaseCourse);

module.exports = router;
