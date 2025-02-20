const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
const dotenv = require("dotenv");

dotenv.config();

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized - Invalid user" });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};


exports.adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Forbidden - Admin access required" });
  }
};
