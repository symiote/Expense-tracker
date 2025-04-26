const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
  if (!req.body) {
    return res.status(400).json({ message: "Request body missing" });
  }

  const { email, password } = req.body;

  //validation: check missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //check if email already exists
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    console.log("u are login");

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
};

//get user info
exports.getUserInfo = async (req, res) => {
    try{
      const user = await  User.findById(req.user.id).select("-password");

      if(!user){
        return res.status(404).json({message: "user not found "})
      }

      res.status(200).json(user);
      
    }catch (err) {
      res
        .status(500)
        .json({ message: "Error registering user", error: err.message });
    }
};

// module.exports = { loginUser, registerUser, getUserInfo };
