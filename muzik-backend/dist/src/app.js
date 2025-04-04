const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("../../routes/authRoutes");
const courseRoutes = require("../../routes/courseRoutes");
const purchaseRoutes = require("../../routes/purchaseRoutes");
const paymentRoutes = require("../../routes/paymentRoutes");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/payments", paymentRoutes);
mongoose.connect('mongodb+srv://unada:unada123@cluster0.utfuulr.mongodb.net/testing?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));