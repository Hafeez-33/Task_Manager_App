const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
// const protect = async (req, res, next) => {
//   try {
//     let token = req.headers.authorization;

//     if (token && token.startsWith("Bearer")) {
//       token = token.split(" ")[1]; // Get token from header
//       const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
//       req.user = await User.findById(decoded.id).select("-password"); // Get user from token
//       next();
//     } else {
//       res.status(401).json({ message: "Not authorized, no token" });
//     }
//   } catch (error) {
//     res.status(401).json({ message: "Token failed", error: error.message });
//   }
// };

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    return next(); // ✅ VERY IMPORTANT
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token failed", error: error.message });
  }
};

//Middleware to for Admin access only
// const adminOnly = (req,res,next) =>{
//     if(req.user && req.user.role == 'admin'){
//         next();
//     }else{
//       return res.status(401).json({message: "Admin denied, admin only"});
//     }
// };
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // 👈 return added
  }

  return res.status(403).json({ message: "Admin denied, admin only" });
};

module.exports = adminOnly;

module.exports = { protect, adminOnly };
