const jwt = require("jsonwebtoken");
const User = require("../user.model");

const authorizeMiddleware = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({message: "Not authorized"});
    }
    const token = authorizationHeader.replace("Bearer ", "");

    let userId;
    try {
      userId = await jwt.verify(token, process.env.JWT_SECRET).id;
    }
    catch (error) {
      return res.status(401).json({message: "Not authorized"});
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({message: "Not authorized"});
    }
    req.user = user;
    req.token = token;
    next();
  }
  catch (error) {
    next(error)
  }
}

module.exports = authorizeMiddleware;