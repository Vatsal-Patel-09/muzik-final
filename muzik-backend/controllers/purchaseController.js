const Purchase = require("../models/Purchase");
const Course = require("../models/Course");

exports.getUserPurchases = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT token
        const purchases = await Purchase.findAll({
            where: { userId },
            include: [{ model: Course }] // Include course details
        });

        res.json(purchases);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
