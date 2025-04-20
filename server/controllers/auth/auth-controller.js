const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Environment secret key
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: true, // Set to true in production with HTTPS
  sameSite: "none", // "None" if frontend is on a different domain + HTTPS lax
  maxAge: 24 * 60 * 60 * 10000, 
};

// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email. Please log in.",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Registration successful. Please login.",
    });
  } catch (e) {
    console.error("Registration Error:", e.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during registration.",
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: checkUser._id,
          email: checkUser.email,
          userName: checkUser.userName,
          role: checkUser.role,
        },
      });
  } catch (e) {
    console.error("Login Error:", e.message);
    res.status(500).json({
      success: false,
      message: "Internal server error during login.",
    });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions).status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access. Token missing.",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
