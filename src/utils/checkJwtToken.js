const jwt = require("jsonwebtoken");
const User = require("../modules/user/user.model");

const checkJwtToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      return res.status(401).json({message: "Not authorized"});
    }
    const token = authorizationHeader.replace("Bearer ", "");

    let jwtEncrypted;
    try {
      jwtEncrypted = await jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
      return res.status(401).json({message: "Not authorized"});
    }
    const user = await User.findById(jwtEncrypted.id);
    if (!user) {
      return res.status(401).json({message: "Not authorized"});
    }

    return {user, token, jwtEncrypted};
  }
  catch (error) {
    next(error)
  }
}

module.exports = checkJwtToken;