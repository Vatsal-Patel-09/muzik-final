const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail", // Use your SMTP provider
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to send OTP
const sendOtp = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

    // Create a JWT token to verify OTP later
    const otpToken = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: "10m" });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return otpToken; // Send token to frontend
};

module.exports = sendOtp;
