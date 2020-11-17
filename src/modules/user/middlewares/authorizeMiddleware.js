const checkJwtToken = require("../../../utils/checkJwtToken");

const authorizeMiddleware = async (req, res, next) => {
  try {
    const {user, token, jwtEncrypted} = await checkJwtToken(req, res, next);
    req.user = user;
    req.token = token;
    req.jwtEncrypted = jwtEncrypted;
    next();
  }
  catch (error) {
    next(error)
  }
}

module.exports = authorizeMiddleware;