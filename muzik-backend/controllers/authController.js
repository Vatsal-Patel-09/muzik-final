const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendOtpEmail = require("../services/sendOtp");
const Otp = require("../models/Otp");


exports.sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        // 10 min OTP expiry
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.deleteMany({ email });

        await new Otp({ email, otp, expiresAt }).save();

        // await sendOtpEmail(email, otp);

        res.json({ message: "OTP sent successfully" });
    } catch (err) {
        console.log("error", err)
        res.status(500).json({ error: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;
        const storedOtp = await Otp.findOne({ email, expiresAt: { $gt: new Date() } });
        console.log("storedOtp", storedOtp)

        if (!storedOtp || !(otp === storedOtp.otp)) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword });

        await Otp.deleteMany({ email });

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            'muziktest',
            { expiresIn: "1d" }
        );

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ error: "User not found" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await Otp.deleteMany({ email });
        await new Otp({ email, otp: hashedOtp, expiresAt }).save();

        await sendOtpEmail(email, otp);

        res.json({ message: "OTP sent for password reset" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const storedOtp = await Otp.findOne({ email, expiresAt: { $gt: new Date() } });

        if (!storedOtp || !(await bcrypt.compare(otp, storedOtp.otp))) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.updateOne({ email }, { password: hashedPassword });

        await Otp.deleteMany({ email });

        res.json({ message: "Password reset successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
