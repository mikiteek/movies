const Joi = require("joi");

const loginUserValidateMiddleware = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const validateResult = schema.validate(req.body);
  if (validateResult.error) {
    return res.status(400).json({message: validateResult.error.message})
  }
  next();
}

module.exports = loginUserValidateMiddleware;