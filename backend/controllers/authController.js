const jwt = require("jsonwebtoken");
const User = require("../models/User");
//new
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const { prototype } = require("events");

//genrate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Regiseter user
exports.registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { fullName, email, password, profileImageUrl } = req.body;

  //validation: check missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //create new user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    res
      .status(201)
      .json({ id: user._id, user, token: generateToken(user._id) });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  //validation: on fronted side done
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.log("u are login");
    // console.log("the user ..",user);

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: "Error login user", error: err.message });
  }
};

//get user info
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "user not found " });
    }

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//new
//forget password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  try {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000*24;
    await user.save();

    const PORT = process.env.PORT || 5000;
    const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
    const resetUrl = `${CLIENT_URL}/reset-password/${token}`;

    await sendEmail(
      email,
      "Password Reset",
      `Click here to : <a href="${resetUrl}">${resetUrl}</a>`
    );

    res.status(200).json({ message: "Reset link sent" });
  } catch (error) {
    console.error("Error sending password reset link:", error);
    res
      .status(500)
      .json({ message: "Failed to send reset link. Please try again later." });
  }
};

//rest password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  //set password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password has been reset" });
};

// module.exports = { loginUser, registerUser, getUserInfo };
