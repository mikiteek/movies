const User = require("../user.model");

const checkEmailExistMiddleware = async (req, res, next) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) {
      return res.status(409).json({message: "Email already exist"});
    }
    next();
  }
  catch (e) {
    next(e);
  }
}

module.exports = checkEmailExistMiddleware;