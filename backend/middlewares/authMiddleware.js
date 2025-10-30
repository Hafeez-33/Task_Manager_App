const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1]; // Get token from header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = await User.findById(decoded.id).select("-password"); // Get user from token
      next();
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token failed", error: error.message });
  }
};

//Middleware to for Admin access only
const adminOnly = (req,res,next) =>{
    if(req.user && req.user.role == 'admin'){
        next();
    }else{
        res.status(401).json({message: "Admin denied, admin only"});
    }
};

module.exports = { protect, adminOnly };
