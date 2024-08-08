const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../utils/tokenBlacklist");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    
    // check token is in black list
    if (tokenBlacklist.has(token)) {
      return res.status(401).send({
        message: "Your token can't used, please login again",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // เก็บข้อมูล decoded ลง req.auth
    req.auth = decoded;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
